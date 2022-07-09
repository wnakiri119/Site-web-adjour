import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Adresse} from "../../../_model/adresse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Tarification} from "../../../_model/tarification";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TARIFICATION_SAVE__POST} from "../../../_api_config/route-api";
import {NgxSpinnerService} from "ngx-spinner";
import {TarificatitionDataHelper} from "../../../_model/_model_helper/tarificatitionData-helper";

@Component({
  selector: 'app-tarrificaton-add',
  templateUrl: './tarrificaton-add.component.html',
  styleUrls: ['./tarrificaton-add.component.scss']
})
export class TarrificatonAddComponent implements OnInit {

  formGroup: FormGroup;
  //this varible permit to control state of form
  private isEdited: boolean = false;
  constructor(public dialogRef: MatDialogRef<TarrificatonAddComponent>,
              @Inject(MAT_DIALOG_DATA) public tarificationHelper: TarificatitionDataHelper,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: this.tarificationHelper.tarification?.id,
      poidsMin: [this.tarificationHelper.tarification.poidsMin, Validators.required],
      poidsMax: [this.tarificationHelper.tarification.poidsMax, Validators.required],
      longueMin: [this.tarificationHelper.tarification.longueMin, Validators.required],
      longuerMax: [this.tarificationHelper.tarification.longuerMax, Validators.required],
      hauteurMax: [this.tarificationHelper.tarification.hauteurMax, Validators.required],
      hauteurMin: [this.tarificationHelper.tarification.hauteurMin, Validators.required],
      price: [this.tarificationHelper.tarification.price, Validators.required],
      adrSourceId: [this.tarificationHelper.tarification.adrSource?.id, Validators.required],
      adrDestinationId: [this.tarificationHelper.tarification.adrDestination?.id, Validators.required],
    })
  }

  close() {
    this.dialogRef.close(this.isEdited);
  }

  remouveId() {
    this.formGroup.setControl('id', new FormControl(null));
  }

  saveTarification() {
    if(this.formGroup.invalid)
      return;

    this.spinner.show();

    this.http.post(`${TARIFICATION_SAVE__POST}`, this.formGroup.value).subscribe(data=>{
      this.isEdited = true;
      this.spinner.hide();
    }, error => {
      if(error.statusCode == 404){
        this.snackBar.open('La tarification que vous tentez de modifier n\'existe pas', 'x', {
          duration: 10000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: 's-error',
        })
      }

      else {
        this.snackBar.open('Une erreur est survenue lors de la création de l\'objet. Si le problème persiste veillez contacter le Service technique adjour-technologie', 'x', {
          duration: 10000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: 's-error',
        })
      }
      this.spinner.hide();
    })
  }

}
