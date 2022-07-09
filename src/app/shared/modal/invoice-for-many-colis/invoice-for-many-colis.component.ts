import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Client} from "../../../_model/client";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Invoice} from "../../../_model/invoice";
import {InvoicePrintComponent} from "../invoce-print/invoice-print.component";
import {Colis} from "../../../_model/colis";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-invoice-for-many-colis',
  templateUrl: './invoice-for-many-colis.component.html',
  styleUrls: ['./invoice-for-many-colis.component.scss']
})
export class InvoiceForManyColisComponent implements OnInit {

  private invoice: Invoice = new Invoice();
  colisFormControls: FormControl = new FormControl('', Validators.required);
  constructor(private dialogRef: MatDialogRef<InvoiceForManyColisComponent>,
              @Inject(MAT_DIALOG_DATA) public colis: Colis[],
              private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close(this.invoice)
  }

  viewInvoice() {
    if(this.colisFormControls.invalid)
      return;

    const invoice = new Invoice();
    invoice.colis = this.colisFormControls.value;

    const dialogueRef = this.dialog.open(InvoicePrintComponent, {
      width: '850px',
      height: 'auto',
      data: invoice
    });

    dialogueRef.afterClosed().subscribe(data=>{
      if(data)
        this.invoice = data;
    })
  }

}
