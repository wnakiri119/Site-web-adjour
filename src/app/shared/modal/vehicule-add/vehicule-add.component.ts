import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Chauffeur} from "../../../_model/chauffeur";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {CHAUFFEUR_SAVE__POST, VEHICULE_SAVE__POST} from "../../../_api_config/route-api";
import {Vehicule} from "../../../_model/vehicule";

@Component({
  selector: 'app-vehicule-add',
  templateUrl: './vehicule-add.component.html',
  styleUrls: ['./vehicule-add.component.scss']
})
export class VehiculeAddComponent implements OnInit {

  formGroup: FormGroup;
  isUpdate = false;
  constructor(public dialogRef: MatDialogRef<VehiculeAddComponent>,
              @Inject(MAT_DIALOG_DATA) public vehicule: Vehicule,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      marque: [this.vehicule.marque, Validators.required],
      imatriculation: [this.vehicule.imatriculation, Validators.required],
      model: [this.vehicule.model, Validators.required],
      id: this.vehicule.id
    })
  }

  close() {
    this.dialogRef.close(this.isUpdate);
  }

  saveVehicule() {
    if(this.formGroup.invalid)
      return;

    this.spinner.show();
    this.http.post(`${VEHICULE_SAVE__POST}`, this.formGroup.value).subscribe(data=>{
      this.isUpdate = true;
      this.snackBar.open('l\'opération c\'est effectuée avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      });
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      if (error.statusCode == 422) {
        this.snackBar.open('impossible de faire la mise à jour car la ressource est inexistante', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: "right",
          duration: 10000
        });
      } else {
        this.snackBar.open('Service momentatement indiponible. Veillez réessayez plus tard', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: "right",
          duration: 10000
        });
      }

    })
  }
}
