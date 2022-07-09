import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Client} from "../../../_model/client";
import {Colis} from "../../../_model/colis";
import {
  COLIS_DELETE_BY_ID__DELETE,
  COLIS_FIND_BY_CLIENT__PAGEABLE__GET, INVOICE_DELETE__DELETE,
  INVOICE_FIND_BY_CLIENT_ID__GET
} from "../../../_api_config/route-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientAddComponent} from "../client-add/client-add.component";
import {ColisAddComponent} from "../colis-add/colis-add.component";
import {ColisViewDetailComponent} from "../colis-view-detail/colis-view-detail.component";
import {Invoice} from "../../../_model/invoice";
import {InvoiceForManyColisComponent} from "../invoice-for-many-colis/invoice-for-many-colis.component";
import {InvoicePrintComponent} from "../invoce-print/invoice-print.component";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  pages = 0;
  size = 25;
  length = 0;
  displayedColumnsColis: string[] = ['code', 'name', 'poids', 'nature','valeur','propretaire','destinataire','dateLastUpdate','montant','quantity','total', 'action'];
  dataSourceColis: MatTableDataSource<Colis> = new MatTableDataSource<Colis>();
  @ViewChild("colisPaginator", {static: true}) paginatorColis: MatPaginator;

  colisAFacture: Colis[] = [];

  dataSourceInvoice: MatTableDataSource<Invoice>= new MatTableDataSource<Invoice>();
  displayedColmnsInvoice: string[] = ['code', 'dateCreated','dateLastUpdate','registerBy','totalAmount','totalWeigth','action'];
  @ViewChild("invoicePaginator", {static: true}) paginatorInvoice: MatPaginator;
  invoicePages = 0;
  invoiseSize = 25;
  invoiceLength = 0;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialogRef: MatDialogRef<ClientInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public client: Client,
              private http: HttpClient,
              private snack: MatSnackBar,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService,
              public authService: AuthenticationService) { }

  ngOnInit(): void {
    this.findColisByClient();

    //recherche des factures clients par pages
    this.findInvoice();
  }

  findColisByClient() {
    this.http.get<any>(`${COLIS_FIND_BY_CLIENT__PAGEABLE__GET}clientId=${this.client.id}&page=${this.pages}&size=${this.size}`).subscribe(data=>{
      this.length = data.totalElements;
      this.dataSourceColis.data = data.content;
      this.dataSourceColis.sort = this.sort;
      this.dataSourceColis.paginator = this.paginatorColis;

      this.colisAFacture = this.dataSourceColis.data.filter(c=>c.colisStatus?.id==1)
    })
  }

  close() {
    this.dialogRef.close();
  }

  updateClient() {
    this.dialog.open(ClientAddComponent, {
      data: this.client,
      width: '600px'
    })
  }

  applyFilterColis(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceColis.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceColis.paginator) {
      this.dataSourceColis.paginator.firstPage();
    }
  }

  applyFilterInvoice(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInvoice.filter = filterValue.toLowerCase();

    if (this.dataSourceInvoice.paginator) {
      this.dataSourceInvoice.paginator.firstPage();
    }
  }


  colisSave(item: Colis) {
    if (!item) {
      item = new Colis();
      item.client = this.client;
    }

    if(item.archiver)
      return;

    const dialogRef = this.dialog.open(ColisAddComponent, {
      width: '850px',
      data: item,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data)
        this.findColisByClient();
    })
  }

  seeDetailColis(element: Colis) {
   this.dialog.open(ColisViewDetailComponent, {
      data: element,
      width: '1000px',
    })
  }

  setPageColis(event: PageEvent) {
    if (event.pageIndex != this.pages) {
      this.pages = event.pageIndex;
      this.size = event.pageSize;
      this.findColisByClient();
    }
  }

  setPageInvoice(event: PageEvent) {
    if (event.pageIndex != this.invoicePages) {
      this.invoicePages = event.pageIndex;
      this.invoiseSize = event.pageSize;
      this.findInvoice();
    }
  }

  colisDelete(element: Colis) {
    if (!confirm('Cette action est définitive. Etes vous sur de vouloir supprimer ce colis?')) {
      return;
    }

    this.spinner.show();
    this.http.delete(`${COLIS_DELETE_BY_ID__DELETE+element.id}`).subscribe(data=>{
      this.snack.open('Le colis a été supprimé avec succès', 'x', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 's-success',
        duration: 5000
      });

      //mise a jour de la vue
      this.findColisByClient();
      this.spinner.hide();

    }, error => {
      this.snack.open(error.error?.message?error.error?.message:'Impossible de supprimer l\'élément', 'x',{
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 's-error',
        duration: 15000
      });
      this.spinner.hide();
    });
  }

  findInvoice() {
    this.http.get<any>(`${INVOICE_FIND_BY_CLIENT_ID__GET+this.client.id}?page=${this.invoicePages}&size=${this.invoiseSize}`).subscribe(data=>{
      this.dataSourceInvoice.data = data.content;
      this.dataSourceInvoice.paginator = this.paginatorInvoice;
    })
  }

  doInvoiceGroupe() {
    const dialogRef = this.dialog.open(InvoiceForManyColisComponent, {
      width: '400px',
      height: 'auto',
      data: this.colisAFacture,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data=>{
      if(data)
        this.dataSourceInvoice.data.unshift(data);
    })

  }

  colisPrint(colis: Colis) {
    const invoice = new Invoice();
    invoice.colis.push(colis);
    const dialogRef = this.dialog.open(InvoicePrintComponent, {
      width: '800px',
      height: 'auto',
      data: invoice
    });

    dialogRef.afterClosed().subscribe(data=>{
      if(data)
        this.findInvoice();
    })
  }

  invoiceDelete(invoice: Invoice) {
    if(!confirm('Cette action est irréverssible. Etes-vous sûr de voiloir supprimer cette facture?'))
      return;

    this.spinner.show();
    this.http.delete(`${INVOICE_DELETE__DELETE+invoice.id}`).subscribe(data=>{
      this.snack.open('La facture a été supprimé avec succès', 'x', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 's-success',
        duration: 5000
      });

      //mise a jour de la vue
      this.findInvoice();
      this.spinner.hide();
    }, error => {
      this.snack.open(error.error?.message?error.error?.message:'Impossible de supprimer l\'élément. Contacter l\'administrateur', 'x',{
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: 's-error',
        duration: 15000
      });
      this.spinner.hide();
    })

  }

  invoiceGet(invoice) {
    this.dialog.open(InvoicePrintComponent, {
      width: '800px',
      height: 'auto',
      data: invoice
    });
  }
}
