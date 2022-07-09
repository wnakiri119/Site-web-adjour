import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {MatTableDataSource} from "@angular/material/table";
import {Invoice} from "../../_model/invoice";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {
  INVOICE_DELETE__DELETE,
  INVOICE_FIND_ALL_PAGEABLE__GET,
  INVOICE_FIND_BY_CLIENT_ID__GET
} from "../../_api_config/route-api";
import {InvoicePrintComponent} from "../../shared/modal/invoce-print/invoice-print.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  dataSourceInvoice: MatTableDataSource<Invoice>= new MatTableDataSource<Invoice>();
  displayedColmnsInvoice: string[] = ['code', 'dateCreated','dateLastUpdate','registerBy','totalAmount','totalWeigth','action'];
  @ViewChild("invoicePaginator", {static: true}) paginatorInvoice: MatPaginator;
  invoicePages = 0;
  invoiseSize = 10;
  invoiceLength = 0;
  pageEvent: PageEvent;

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              public authService: AuthenticationService,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.invoiceFindAll();
  }

  invoiceFindAll() {
    this.spinner.show();
    this.http.get<any>(`${INVOICE_FIND_ALL_PAGEABLE__GET}page=${this.invoicePages}&size=${this.invoiseSize}`).subscribe(data=>{
      this.dataSourceInvoice.data = data.content;
      this.dataSourceInvoice.paginator = this.paginatorInvoice;

      setTimeout(()=>{
        this.invoiceLength = data.totalElements;
      }, 1000);
      this.spinner.hide();
    }, error => this.spinner.hide())
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
      this.invoiceFindAll();
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

  setPageInvoice(event: PageEvent) {
    if (event.pageIndex != this.invoicePages) {
      this.invoicePages = event.pageIndex;

      this.invoiseSize = event.pageSize;

      event.length = this.invoiceLength;

      this.invoiceFindAll();
    }

    return event;
  }

  applyFilterInvoice(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInvoice.filter = filterValue.toLowerCase();

    if (this.dataSourceInvoice.paginator) {
      this.dataSourceInvoice.paginator.firstPage();
    }
  }
}
