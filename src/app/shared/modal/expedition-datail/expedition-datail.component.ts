import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Expedition} from "../../../_model/expedition";
import {COLIS_FIND_BY_EXPEDITION__GET, EXPEDITON_REMOVE_COLIS__DELETE} from "../../../_api_config/route-api";
import {MatTableDataSource} from "@angular/material/table";
import {Colis} from "../../../_model/colis";
import {MatPaginator} from "@angular/material/paginator";
import {ColisViewDetailComponent} from "../colis-view-detail/colis-view-detail.component";
import {Invoice} from "../../../_model/invoice";
import {InvoicePrintComponent} from "../invoce-print/invoice-print.component";
import {ColisAddComponent} from "../colis-add/colis-add.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-expedition-datail',
  templateUrl: './expedition-datail.component.html',
  styleUrls: ['./expedition-datail.component.scss']
})
export class ExpeditionDatailComponent implements OnInit {
  dataSourceColis: MatTableDataSource<Colis>=new MatTableDataSource<Colis>();
  displayedColumnsColis: string[] = ['code', 'name', 'poids', 'nature','valeur','propretaire','destinataire','dateLastUpdate','montant','quantity','total', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  poids=0;
  totalAmount=0;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ExpeditionDatailComponent>,
              @Inject(MAT_DIALOG_DATA) public expedition: Expedition) { }

  ngOnInit(): void {
    this.colisFindByExpedition();
  }


  colisFindByExpedition() {
    this.spinner.show('expeditionView')
    this.http.get<any>(`${COLIS_FIND_BY_EXPEDITION__GET + this.expedition.id}`).subscribe(data=>{
      this.dataSourceColis.data = data;
      this.dataSourceColis.paginator = this.paginator;
      this.dataSourceColis.data.forEach(c=>{
        this.totalAmount += c.amountExpedition;
        if(c.poids)
          this.poids += c.poids;
      })

      this.expedition.nombreColis = this.dataSourceColis.data.length;
      this.spinner.hide('expeditionView')
    }, error => this.spinner.hide('expeditionView'));
  }


  close() {
    this.dialogRef.close();
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


  applyFilterColis(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceColis.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceColis.paginator) {
      this.dataSourceColis.paginator.firstPage();
    }
  }

  removeColis(colis: Colis) {
    if(!confirm('êtes sur de vouloir retirer le colis dans cette expédition?'))
      return;

    this.spinner.show('expeditionView')
    this.http.delete(`${EXPEDITON_REMOVE_COLIS__DELETE+colis.id}/${this.expedition.id}`).subscribe(data=>{
      this.spinner.hide('expeditionView')
      this.colisFindByExpedition();

      this.snackBar.open('Le colis a été retiré', 'x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      })

    }, error => {
      this.spinner.hide('expeditionView')
      this.snackBar.open('Service indisponible', 'x', {
        panelClass: 's-error',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      })
    })
  }
}
