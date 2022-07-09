import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Expedition} from "../../_model/expedition";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppSettingService} from "../../services/app-setting.service";
import {Colis} from "../../_model/colis";
import {MatDialog} from "@angular/material/dialog";
import {ColisAddComponent} from "../../shared/modal/colis-add/colis-add.component";
import {
  CLIENT_FIND_ALL__GET,
  COLIS_FIND_ARCHIVED_IS_FALSE__GET,
  COLIS_FIND_IS_ARCHIVED__PAGEABLE__GET, EXPEDITION_FIND_ALL__PAGEABLE__GET, EXPEDITON_DELETE_BY_ID__DELETE
} from "../../_api_config/route-api";
import {Client} from "../../_model/client";
import {ClientAddComponent} from "../../shared/modal/client-add/client-add.component";
import {ColisViewDetailComponent} from "../../shared/modal/colis-view-detail/colis-view-detail.component";
import {ClientInfoComponent} from "../../shared/modal/client-info/client-info.component";
import {InvoicePrintComponent} from "../../shared/modal/invoce-print/invoice-print.component";
import {Invoice} from "../../_model/invoice";
import {NgxSpinnerService} from "ngx-spinner";
import {ExpeditionAddComponent} from "../../shared/modal/expedition-add/expedition-add.component";
import {ExpeditionDatailComponent} from "../../shared/modal/expedition-datail/expedition-datail.component";
import {StatusModalComponent} from "../../shared/modal/status-modal/status-modal.component";
import {StatusColis} from "../../_model/_model_helper/status-colis";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.scss']
})
export class TrajetsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dateDepart', 'dateArrive', 'nbreColis', 'adresseSource','adresseDestination','updateEtat', 'action'];
  dataSource: MatTableDataSource<Expedition> = new MatTableDataSource<Expedition>();


  displayedColumnsClient: string[] = ['id','name','surname','dateNais','telephone','dateCreation','dateLastUpdate','isUser','sexe','action'];
  dataSourceClient: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  @ViewChild('paginatorClient', {static: true})  paginationClient: MatPaginator;


  sizeClient: number=25;
  pageClient: number=0;
  totalItemsClient: number;

  colisIsArchived = false;

  // pagination deuxième tableau

  /*------- pagination -------------------------------*/
  public totalItem: number=0;
  page = 0;
  private size: number=25;
  pageEvent: PageEvent;
  /*------------------ fin -----------------------------*/
  @ViewChild("expeditionPaginator", {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  expeditions: Expedition[] = [];
  periodeForm: FormGroup;


  /*----------- for second table ----------------------*/
  displayedColumnsColis: string[] = ['code', 'name', 'poids', 'nature','valeur','propretaire','destinataire','dateLastUpdate','montant','quantity','total', 'action'];
  dataSourceColis: MatTableDataSource<Colis> = new MatTableDataSource<Colis>();


  public totalItemColis: number;
  pageColis = 0;
  sizeColis = 25;
  pageEventColis: PageEvent;

  @ViewChild("colisPaginator", {static: true}) paginatorColis: MatPaginator;

  //id des colis pour l'envoie de mails au propriétaire
  colisIds: string[] = [];

  //emails des clients selectionné pour l'envoie des mails
  clientEmails: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private router: Router,
              public appSettings: AppSettingService) { }

  ngOnInit(): void {
    this.periodeForm = this.formBuilder.group({
      from: [new Date(), Validators.required],
      till: ['', Validators.required]
    })

    this.findColis(this.colisIsArchived);
    this.clientFindAll();
    this.expeditionFindAll();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  setPage(e: PageEvent): PageEvent {
    if (e.pageIndex != this.page) {
      this.size = e.pageSize;
      this.page = e.pageIndex;
      this.expeditionFindAll();
    }
    return e;
  }

  applyFilterColis(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceColis.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceColis.paginator) {
      this.dataSourceColis.paginator.firstPage();
    }
  }

  applyFilterClient(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClient.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClient.paginator) {
      this.dataSourceClient.paginator.firstPage();
    }
  }

  setPageColis(e: PageEvent): PageEvent {
    if (e.pageIndex != this.pageColis) {
      this.sizeColis = e.pageSize;
      this.pageColis = e.pageIndex;

      this.findColis(this.colisIsArchived);
    }

    return e;
  }

  setPageClient(e: PageEvent): PageEvent {
    if (e.pageIndex != this.pageClient) {
      this.sizeClient = e.pageSize;
      this.pageClient = e.pageIndex;

      this.clientFindAll();
    }

    return e;
  }

  findTrajetForPeriode() {

  }

  seeDetailColis(element: Colis) {
    const dialogRef =  this.dialog.open(ColisViewDetailComponent, {
      data: element,
      width: '1000px',
    })

    dialogRef.afterClosed().subscribe(data=>{
      element = data;
    })
  }

  expeditionFindAll() {
    this.spinner.show();
    this.http.get<any>(`${EXPEDITION_FIND_ALL__PAGEABLE__GET}page=${this.page}&size=${this.size}`).subscribe(data=>{
      this.dataSource.data = data.content;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.totalItem = data.totalElements;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }


  editExpedition(element: any) {

  }

  seeDetail(element: any) {
    const dialogRef = this.dialog.open(ExpeditionDatailComponent, {
      data: element,
      width: '1400px',
    })
  }

  findColis(value: boolean) {
    this.colisIsArchived = value;
    if(this.colisIsArchived)
      this.colisFindArchivedITrue()

    else
      this.colisFindArchivedIsFalese();
  }


  private colisFindArchivedITrue() {
    this.spinner.show();
    this.http.get<any>(`${COLIS_FIND_IS_ARCHIVED__PAGEABLE__GET}page=${this.pageColis}&size=${this.sizeColis}`).subscribe(data =>{
      this.totalItemColis = data.totalElements;
      this.dataSourceColis.data = data.content;
      this.dataSourceColis.paginator = this.paginatorColis;
      this.dataSourceColis.sort = this.sort;
      this.spinner.hide();
    }, error => this.spinner.hide())
  }


  private colisFindArchivedIsFalese() {
    this.spinner.show();
    this.http.get<any>(`${COLIS_FIND_ARCHIVED_IS_FALSE__GET}page=${this.pageColis}&size=${this.sizeColis}`).subscribe(data =>{
      this.totalItemColis = data.totalElements;
      this.dataSourceColis.data = data.content;
      this.dataSourceColis.paginator = this.paginatorColis;
      this.dataSourceColis.sort = this.sort;
      this.spinner.hide();
    }, error => this.spinner.hide());
  }

  clientFindAll() {
    this.spinner.show();
    this.http.get<any>(`${CLIENT_FIND_ALL__GET}page=${this.pageClient}&size=${this.sizeClient}`).subscribe(data =>{
      this.totalItemsClient = data.totalElements;
      this.dataSourceClient.data = data.content;
      this.dataSourceClient.paginator = this.paginatorColis;
      this.dataSourceClient.sort = this.sort;
      this.spinner.hide();
    }, error => this.spinner.hide());
  }

  colisSave(colis: Colis) {
    if(!colis)
      colis = new Colis();

    if(colis.archiver)
      return;
    const dialogRef = this.dialog.open(ColisAddComponent, {
      width: '850px',
      data: colis,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data=>{
      if (data) {
        this.findColis(this.colisIsArchived);
      }
    })
  }


  clientSave(client: Client) {
    if(!client)
      client = new Client();

    const dialogRef = this.dialog.open(ClientAddComponent, {
      width: '600px',
      data: client,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data=>{
      if (data) {
        this.clientFindAll();
      }
    })
  }


  clientDetail(client: Client) {
    this.dialog.open(ClientInfoComponent, {
      data: client,
      width: '1150px',
      minHeight: '500px',
      disableClose: false
    })
  }

  /**
   * Impression colis
   * @param element
   */
  colisPrint(colis: Colis) {
    const invoice = new Invoice();
    invoice.colis.push(colis);
    this.dialog.open(InvoicePrintComponent, {
      width: '800px',
      height: 'auto',
      data: invoice
    });
  }

  expeditionSave(param) {
    let expedition = param;
    if(!param)
      expedition = new Expedition();

    const dialogRef =this.dialog.open(ExpeditionAddComponent, {
      data: expedition,
      width: '1250px',
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data=>{
      if(data)
        this.findTrajetForPeriode();
    })
  }

  expeditionDelete(element) {
    if(!confirm('êtes vous sur de vouloir supprimer?'))
      return;

    this.spinner.show();
    this.http.delete(`${EXPEDITON_DELETE_BY_ID__DELETE + element.id}`).subscribe(data=>{
      this.spinner.hide();
      this.snackBar.open('Suppression réussite', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 7000
      });
      this.expeditionFindAll();
    }, error => {
      this.snackBar.open('Service indisponible', 'x', {
        panelClass: 's-error',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 7000
      });
      this.spinner.show();
    })
  }

  expeditionSetStatus(element) {
    const statusHelper = new StatusColis();
    statusHelper.indexForm = 0;
    statusHelper.id = element.id;
    const dialogRef = this.dialog.open(StatusModalComponent, {
      data: statusHelper,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(data=>{
      if (data) {
        this.expeditionFindAll();
        this.findColis(this.colisIsArchived);
      }
    })
  }

  sendEmail() {
    if(this.colisIds.length == 0){
      this.snackBar.open('Veillez selectioner au moins un colis', 'x', {
        panelClass: 's-warning',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 7000,
      });
      return;
    }

    this.router.navigate(['/dashboard','mails','2',btoa(this.colisIds.toString())]);
  }

  selectColis(event: MatCheckboxChange) {
    if (event.checked && this.colisIds.indexOf(event.source.value)<0) {
      this.colisIds.push(event.source.value);
    }
    else if(!event.checked){
      this.colisIds = this.colisIds.filter(id=> id!=event.source.value);
    }
  }


  selectClientEmail(event: MatCheckboxChange) {
    if (event.checked && event.source.value && this.clientEmails.indexOf(event.source.value)<0) {
      this.clientEmails.push(event.source.value);
    }
    else if(!event.checked && event.source.value){
      this.clientEmails = this.clientEmails.filter(id=> id!=event.source.value);
    }
  }

  sendEmailExpedition(element: Expedition) {
    this.router.navigate(['/dashboard','mails','1',btoa(element.id)]);
  }

  sendEmailForClientSelected() {
    if(this.clientEmails.length == 0){
      this.snackBar.open('Veillez selectioner au moins un client', 'x', {
        panelClass: 's-warning',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 7000,
      });
      return;
    }

    this.router.navigate(['/dashboard','mails','3',btoa(this.clientEmails.toString())]);
  }
}
