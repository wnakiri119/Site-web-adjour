import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Tarification} from "../../_model/tarification";
import {MatDialog} from "@angular/material/dialog";
import {AdressAddComponent} from "../../shared/modal/adress-add/adress-add.component";
import {TarrificatonAddComponent} from "../../shared/modal/tarrificaton-add/tarrificaton-add.component";
import {Pays} from "../../_model/pays";
import {PaysAddComponent} from "../../shared/modal/pays-add/pays-add.component";
import {Ville} from "../../_model/ville";
import {VilleAddComponent} from "../../shared/modal/ville-add/ville-add.component";
import {HttpClient} from "@angular/common/http";
import {
  AGENCE_FIND_ALL__GET,
  CHAUFFEUR_FIND_ALL_PAGEABLE__GET,
  COLIS_STATE_FIND_ALL__GET,
  EMPLOYER_FIND_ALL__GET,
  EMPLOYER_FIND_ALL__PAGEABLE__GET,
  ENTERPRISE__GET_INFO__GET, ENTERPRISE_SAVE__POST,
  EXPEDITION_STATE_FIND_ALL__GET,
  GRILLE_TARRIFAIRE_FIND_ALL__GET,
  PAYS_FIND_ALL__GET,
  VEHICULE_FIND_ALL_PAGEABLE__GET
} from "../../_api_config/route-api";
import {TarificatitionDataHelper} from "../../_model/_model_helper/tarificatitionData-helper";
import {StatusColis} from "../../_model/_model_helper/status-colis";
import {StatusExpedition} from "../../_model/status-expedition";
import {ColisStateAddComponent} from "../../shared/modal/colis-state-add/colis-state-add.component";
import {Agence} from "../../_model/agence";
import {Employer} from "../../_model/employer";
import {Chauffeur} from "../../_model/chauffeur";
import {Vehicule} from "../../_model/vehicule";
import {EmployerAddComponent} from "../../shared/modal/employer-add/employer-add.component";
import {ChauffeurAddComponent} from "../../shared/modal/chauffeur-add/chauffeur-add.component";
import {VehiculeAddComponent} from "../../shared/modal/vehicule-add/vehicule-add.component";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator, numeriqueValidator} from "../../theme/utils/app-validators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {

  displayedColumnsAgence: string[] = ['id', 'code', 'name', 'ville','action'];
  dataSourceAgence: MatTableDataSource<Agence> = new  MatTableDataSource<Agence>();

  @ViewChild('employerPaginator', {static: true}) employerPaginator: MatPaginator ;
  displayedColumnsEmployer: string[] = ['id', 'name', 'surname', 'matricule','dateCreated','dateLastUpdate','code_agence','action'];
  dataSourceEmployer: MatTableDataSource<Employer> = new  MatTableDataSource<Employer>();

  displayedColumnsChauffeur: string[] = ['id', 'name', 'surname', 'telephone','action'];
  dataSourceChauffeur: MatTableDataSource<Chauffeur> = new  MatTableDataSource<Chauffeur>();

  displayedColumnsVehicule: string[] = ['id', 'marque', 'model', 'imatriculation','action'];
  dataSourceVehicule: MatTableDataSource<Vehicule> = new  MatTableDataSource<Vehicule>();

  @ViewChild('tarificationPaginator', {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['source','destination', 'poidsMin', 'PoidsMax', 'longueurMin', 'longueurMax','hauteurMin','hauteurMax', 'price', 'action'];
  dataSource: MatTableDataSource<Tarification> = new MatTableDataSource<Tarification>();

  statusHeader = ['id', 'value', 'description','action'];
  dataSourceStatusExpedition = new MatTableDataSource<StatusExpedition>();
  dataSourceStatusColis = new MatTableDataSource<StatusColis>();

  // pagination deuxième tableau

  /*------- pagination -------------------------------*/
  public totalItem;
  page = 0;
  private size=25
  pageEvent: PageEvent;

  public totalItemEmployer;
  pageEmployer = 0;
  private sizeEmployer=200
  pageEventEmployer: PageEvent;
  /*------------------ fin -----------------------------*/

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  pays: Pays[] = [];


  enterpriseForm: FormGroup;

  constructor(private dialogue: MatDialog,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private snackBer: MatSnackBar,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.findAllPays();
    this.findAddress();
    this.findTarification();

    this.colisStateFindAll();
    this.expeditionStateFindAll();

    this.employerFindAll();
    this.chauffeurFindAll();
    this.vehiculeFindAll();

    this.findEnterprise();

  }


  findEnterprise() {
    this.http.get<any>(`${ENTERPRISE__GET_INFO__GET}1`).subscribe(data=>{
      this.enterpriseForm = this.formBuilder.group({
        id: data.id,
        name: [data.name, Validators.required],
        adresse: [data.adresse, Validators.maxLength(255)],
        phone1: [data.phone1, Validators.compose([Validators.required, numeriqueValidator])],
        phone2: [data.phone2, numeriqueValidator],
        email: [data.email, emailValidator]
      })
    })
  }


  findTarification() {
    this.spinner.show();
    this.http.get<any>(`${GRILLE_TARRIFAIRE_FIND_ALL__GET}page=${this.page}&size=${this.size}`).subscribe(data=>{
      this.totalItem = data.totalElements;
      this.dataSource.data = data.content;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  findAddress() {
    this.spinner.show();
    this.http.get<any>(`${AGENCE_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.dataSourceAgence.data=data.content;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  employerFindAll() {
    this.spinner.show();
    this.http.get<any>(`${EMPLOYER_FIND_ALL__PAGEABLE__GET}page=${this.pageEmployer}&size=${this.sizeEmployer}`).subscribe(data=>{
      this.dataSourceEmployer.data=data.content;
      this.dataSourceEmployer.sort=this.sort;
      this.dataSourceEmployer.paginator=this.employerPaginator;
      this.totalItemEmployer = data.totalElements;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  chauffeurFindAll() {
    this.spinner.show();
    this.http.get<any>(`${CHAUFFEUR_FIND_ALL_PAGEABLE__GET}page=0&size=200`).subscribe(data=>{
      this.dataSourceChauffeur.data=data.content;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  vehiculeFindAll() {
    this.spinner.show();
    this.http.get<any>(`${VEHICULE_FIND_ALL_PAGEABLE__GET}page=0&size=200`).subscribe(data=>{
      this.dataSourceVehicule.data=data.content;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  setPage(e: PageEvent): PageEvent {
    if (this.page != e.pageIndex) {
      this.size = e.pageSize;
      this.page = e.pageIndex;

      this.findTarification();
    }
    return e;
  }


  findAllPays() {
    this.spinner.show();
    this.http.get<any>(`${PAYS_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.pays = data.content;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  editGrilleTarif(element: any) {

  }


  openSaveAdressModal(agence: Agence) {
    if(!agence) {
      agence = new Agence();
    }

    let dialog = this.dialogue.open(AdressAddComponent, {
      width: '600px',
      data: agence,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if(data) {
        this.findAddress();

      }

    })
  }

  openSavePays(pays: Pays) {
    if(pays == null)
      pays = new Pays();
    let dialog = this.dialogue.open(PaysAddComponent, {
      width: '500px',
      data: pays,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data=>{
      if(data) {
        this.findAllPays();
      }
    })
  }

  openSaveVille(ville: Ville) {
    if(ville == null)
      ville = new Ville();
    let dialog = this.dialogue.open(VilleAddComponent, {
      width: '700px',
      data: ville,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data=>{
      if(data) {
        this.findAllPays();
      }
    })
  }




  openSaveTarificationModal(tarification: Tarification) {
    if(!tarification)
      tarification = new Tarification();
    const tarificatitionDataHelper = new TarificatitionDataHelper();
    tarificatitionDataHelper.tarification = tarification;
    /*tarificatitionDataHelper.adresseSource = this.adresseSource;
    tarificatitionDataHelper.adresseDestination = this.adresseDestination;*/

    let dialog = this.dialogue.open(TarrificatonAddComponent, {
      width: '850px',
      data: tarificatitionDataHelper,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data => {
      if(data) {
       this.findTarification()
      }

    })
  }

  getVille(p: Pays) {
    p.afficheVille = !p.afficheVille;
  }


  openSaveStatus(status: StatusColis, indeForm: number) {
    if(!status)
      status = new StatusColis();

    status.indexForm = indeForm;

    this.openStatusDialog(status);
  }

  colisStateFindAll() {
    this.spinner.show();
    this.http.get<any>(`${COLIS_STATE_FIND_ALL__GET}`).subscribe(data=>{
      this.dataSourceStatusColis.data = data;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  expeditionStateFindAll() {
    this.spinner.show();
    this.http.get<any>(`${EXPEDITION_STATE_FIND_ALL__GET}`).subscribe(data=>{
      this.dataSourceStatusExpedition.data = data;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }

  openStatusDialog(status: StatusColis) {
    const dialogRef = this.dialogue.open(ColisStateAddComponent, {
      width: '400px',
      data: status
    });

    dialogRef.afterClosed().subscribe(data=>{
      if (data) {
        if(status.indexForm == 1)
          this.colisStateFindAll()
        else
          this.expeditionStateFindAll();
      }
    })

  }

  openSaveVehicule(vehicule: Vehicule) {
    if(vehicule == null)
      vehicule = new Vehicule();
    let dialog = this.dialogue.open(VehiculeAddComponent, {
      width: '500px',
      data: vehicule,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data=>{
      if(data) {
        this.vehiculeFindAll();
      }
    })
  }

  openSaveChauffeur(chauffeur: Chauffeur) {
    if(chauffeur == null)
      chauffeur = new Chauffeur();
    let dialog = this.dialogue.open(ChauffeurAddComponent, {
      width: '500px',
      data: chauffeur,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data=>{
      if(data) {
        this.chauffeurFindAll();
      }
    })
  }

  setPageEmployer(event: PageEvent): PageEvent {
    if (this.pageEmployer != event.pageIndex) {
      this.pageEmployer = event.pageIndex;
      this.sizeEmployer = event.pageSize;

      this.employerFindAll();
    }
    return event;
  }

  openSaveEmployer(employer: Employer) {
    if(employer == null)
      employer = new Employer();
    let dialog = this.dialogue.open(EmployerAddComponent, {
      width: '700px',
      data: employer,
      disableClose: true
    });

    dialog.afterClosed().subscribe(data=>{
      if(data) {
        this.employerFindAll();
      }
    })
  }

  saveEnterprise() {
    if(this.enterpriseForm.invalid)
      return;

    this.spinner.show();
    this.http.post(`${ENTERPRISE_SAVE__POST}`, this.enterpriseForm.value).subscribe(data=>{
      this.spinner.hide();
      this.snackBer.open('informations sur l\'entreprise enregistrées avec succès', 'x', {
        panelClass: 's-success',
        duration: 10000,
        verticalPosition: "top",
        horizontalPosition: "right"
      })
    }, error => {
      this.snackBer.open('Service momentanement indisponible. Veillez contacter l\'administrateur si le problème persiste', 'x', {
        panelClass: 's-error',
        duration: 10000,
        verticalPosition: "top",
        horizontalPosition: "right"
      })
    })
  }
}
