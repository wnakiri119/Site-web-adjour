import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Pays} from "../../../_model/pays";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {Colis} from "../../../_model/colis";
import {
  AGENCE_FIND_ALL__GET,
  CLIENT_FIND_BY_NAME__LIST__GET,
  COLIS_SAVE__POST,
  USER_FIND_IS_ACTIVATED__GET
} from "../../../_api_config/route-api";
import {Utilisateur} from "../../../_model/utilisateur";
import {emailValidator, numeriqueValidator} from "../../../theme/utils/app-validators";
import {Client} from "../../../_model/client";
import {Destinataire} from "../../../_model/destinataire";
import {Agence} from "../../../_model/agence";
import {ClientAddComponent} from "../client-add/client-add.component";

@Component({
  selector: 'app-colis-add',
  templateUrl: './colis-add.component.html',
  styleUrls: ['./colis-add.component.scss']
})
export class ColisAddComponent implements OnInit, AfterViewInit {

  colisForm: FormGroup;
  desFrom: FormGroup;

  relationClientDestinataireOptions = ['AMI','COLLEGUE','ENFANT','FRERE','PARENT','FAMILLE','EPOUX','AUTRE'];
  natureColis = ['COURRIER','COLIS','AUTRE'];
  valeursColis = [
    {label: 'inférieur à 10000', value: 'TRANCHE1'},
    {label: 'compris entre 10001-50000', value: 'TRANCHE2'},
    {label: 'compris entre 50001-150000', value: 'TRANCHE3'},
    {label: 'compris entre 150001-300000', value: 'TRANCHE4'},
    {label: 'compris entre 300001-500000', value: 'TRANCHE5'},
    {label: 'compris entre 500001-1500000', value: 'TRANCHE6'},
    {label: 'compris entre 15000001-3000000', value: 'TRANCHE7'},
    {label: 'supérieur à 3000001', value: 'TRANCHE8'},
  ]


  isUpdate=false;
  clients: Client[]=[];
  showUser= true;
  showDepart = false;
  showArriver = false;
  agences: Agence[];


  constructor(public dialogRef: MatDialogRef<ColisAddComponent>,
              @Inject(MAT_DIALOG_DATA) public colis: Colis,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.agenceFindAll();

    this.colisForm = this.formBuilder.group({
      id: this.colis.id,
      name: [this.colis.name, Validators.required ],
      description: this.colis.description,
      poids: this.colis.poids,
      largeur:this.colis.largeur,
      hauteur: this.colis.hauteur,
      clientId: [this.colis.client?.id, Validators.required],
      amountExpedition: [this.colis.amountExpedition, Validators.required],
      valeur: [this.colis.valeur, Validators.required],
      nature: [this.colis.nature, Validators.required],
      quantity: [this.colis.quantity, Validators.required],
      arriveId: [this.colis.arrive?.id, Validators.required],
    });

    this.desFrom = this.formBuilder.group({
      id: this.colis.destinataire?.id,
      name: [this.colis.destinataire?.name, Validators.required],
      surname: [this.colis.destinataire?.surname, Validators.required],
      telephone: [this.colis.destinataire?.telephone, Validators.compose([Validators.required, Validators.maxLength(9), numeriqueValidator])],
      email: [this.colis.destinataire?.email, emailValidator],
      relationClientDestinataire: [this.colis.destinataire?.relationClientDestinataire, Validators.required]
    })

  }

  ngAfterViewInit(): void {
    /*if (this.colis?.client) {
      (document.getElementById('clientId') as HTMLInputElement).value = this.colis.client.name + ' ' + this.colis.client.surname;
    }*/
  }



  close() {
    this.dialogRef.close(this.isUpdate);
    this.isUpdate = false;
  }

  saveColis() {
    if(this.colisForm.invalid || this.desFrom.invalid)
      return;

    this.spinner.show();

    const destinataire = this.desFrom.value as Destinataire;

    this.colisForm.addControl('destinataire', new FormControl(destinataire));


    this.http.post(`${COLIS_SAVE__POST}`, this.colisForm.value).subscribe(data=>{
      this.isUpdate = true;
      this.spinner.hide();
      this.snackBar.open('l\'opération c\'est effectuée avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      });
    }, error => {
      this.spinner.hide();
      if (error.statusCode == 404) {
        this.snackBar.open('La resource demandé n\'existe pas', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });
      } else if (error.statusCode == 422) {
        this.snackBar.open('Imposible de modifier les données du colis car il n\'existe pas dans la base de donnée', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });
      } else {
        this.snackBar.open('Une erreur est survenu lors de la création du pays. Veillez reessayer plus tard', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });
      }

    })
  }

  clientFindByName(event) {

    const value = event.target.value;

    if (value && (value.length > 3)) {
      this.http.get<any>(`${CLIENT_FIND_BY_NAME__LIST__GET}search=${value}`).subscribe(data=>{
        this.clients = data;
      })
    }

  }


  agenceFindAll() {
    this.http.get<any>(`${AGENCE_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.agences = data.content;
    })
  }

  showUserPannel() {
    this.showUser = true;
  }



  setIdClient(u: Client) {
    this.colisForm.setControl('clientId', new FormControl(u.id));
    (document.getElementById('clientId') as HTMLInputElement).value = u.name + ' ' + u.surname;

    this.showUser = false;
  }

  seeDetailForClient(client: Client) {
    if (!client)
      client = new Client();
   this.dialog.open(ClientAddComponent, {
      width: '600px',
      data: client,
    });
  }
}
