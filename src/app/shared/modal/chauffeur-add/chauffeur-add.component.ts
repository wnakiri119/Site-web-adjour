import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StatusColis} from "../../../_model/_model_helper/status-colis";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {Chauffeur} from "../../../_model/chauffeur";
import {CHAUFFEUR_SAVE__POST} from "../../../_api_config/route-api";

@Component({
  selector: 'app-chauffeur-add',
  templateUrl: './chauffeur-add.component.html',
  styleUrls: ['./chauffeur-add.component.scss']
})
export class ChauffeurAddComponent implements OnInit {

  chauffeurForm: FormGroup;
  isUpdate = false;
  constructor(public dialogRef: MatDialogRef<ChauffeurAddComponent>,
              @Inject(MAT_DIALOG_DATA) public chauffeur: Chauffeur,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.chauffeurForm = this.formBuilder.group({
      name: [this.chauffeur.name, Validators.required],
      surname: [this.chauffeur.surname, Validators.required],
      telephone: [this.chauffeur.telephone, Validators.required],
      id: this.chauffeur.id
    })
  }

  close() {
    this.dialogRef.close(this.isUpdate);
  }

  saveChauffeur() {
    if(this.chauffeurForm.invalid)
      return;

    this.spinner.show();
    this.http.post(`${CHAUFFEUR_SAVE__POST}`, this.chauffeurForm.value).subscribe(data=>{
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
