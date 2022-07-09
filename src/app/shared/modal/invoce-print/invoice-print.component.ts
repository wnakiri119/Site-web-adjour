import {Component, Inject, OnInit} from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Invoice} from "../../../_model/invoice";
import {ENTERPRISE__GET_INFO__GET, INVOICE_SAVE__POST} from "../../../_api_config/route-api";
import {Enterprise} from "../../../_model/enterprise";
import {Validators} from "@angular/forms";
import {emailValidator, numeriqueValidator} from "../../../theme/utils/app-validators";

//import pdfFonts from "pdfmake/build/vfs_fonts";
//pdfMake.vfs = pdfFonts.pdfMake.vfs;

class InvoiceHelper {
  id: string;
  colis: string[];

  constructor() {
    this.colis = [];
  }
}

@Component({
  selector: 'app-invoce-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements OnInit {

  totalAmount = 0;
  totalWeigth = 0;
  commments = 'Le Lorem Ipsum est simplement du faux texte' +
    ' employé dans la composition et la mise en page avant impression.' +
    ' Le Lorem Ipsum est le faux texte standard de l\'imprimerie depuis' +
    ' les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux' +
    ' de texte pour réaliser un livre spécimen de polices de texte. Il n\'a pas' +
    ' fait que survivre cinq siècles, mais s\'est aussi adapté à la bureautique' +
    ' informatique, sans que son contenu n\'en soit modifié.';

  certificate = 'On sait depuis longtemps que travailler avec du texte lisible' +
    ' et contenant du sens est source de distractions, et empêche' +
    ' de se concentrer sur la mise en page elle-même.';

  private isUpdate = false;

  private invoiceHelper = new InvoiceHelper();

  entrerprise: Enterprise;

  constructor(private dialogueRef: MatDialogRef<InvoicePrintComponent>,
              @Inject(MAT_DIALOG_DATA) public invoice: Invoice,
              private http: HttpClient,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.invoiceHelper.id = this.invoice.id;
    this.invoice.colis.forEach(c=>{
      this.totalAmount+=c.amountExpedition;
      this.totalWeigth+=c.poids;


      this.invoiceHelper.colis.push(c.id);
    });

    this.findEnterprise();
  }


  findEnterprise() {
    this.http.get<any>(`${ENTERPRISE__GET_INFO__GET}1`).subscribe(data=>{
      this.entrerprise = data;
    })
  }


  close() {
    this.dialogueRef.close(this.isUpdate);
  }

  getDate() : string{
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return (day+'-'+month+'-'+year);
  }

  imprimer() {
    this.spinner.show();

    this.http.post(`${INVOICE_SAVE__POST}`, this.invoiceHelper, {responseType: "blob"}).subscribe(data=>{
      this.spinner.hide();
      this.isUpdate = true;

      //download invoice
      const file = new File([data], 'invoice.pdf', data)
      const objectUrl: string = URL.createObjectURL(file);
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

      a.href = objectUrl;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);

    }, error => {
      if (error.statusCode == 406) {
        this.snackBar.open('Application Mal paramétrée. Veillez configurer les status des colis sous l\'onglet paramètre. ' +
          'Veillez contacter l\'administrateur.','x',{
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 15000,
          panelClass: 's-error'
        });
      }

      if (error.statusCode == 422) {
        this.snackBar.open('Identifiant pas trouvé. Rien à faire','x',{
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 15000,
          panelClass: 's-error'
        });
      }

      this.snackBar.open('Une erreur est survenue lors du chargement. Veillez contacter l\'administrateur.','x',{
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 10000,
        panelClass: 's-error'
      });
      this.spinner.hide();
    })

  }


  generateFromTable() {
    let data:any[] = [];


  }

  getImage() {
    const img = document.getElementById('logo18');

  }
}
