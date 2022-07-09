import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Adresse} from "../../../_model/adresse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Pays} from "../../../_model/pays";
import {NgxSpinnerService} from "ngx-spinner";
import {PAYS_SAVE__POST} from "../../../_api_config/route-api";

@Component({
  selector: 'app-pays-add',
  templateUrl: './pays-add.component.html',
  styleUrls: ['./pays-add.component.scss']
})
export class PaysAddComponent implements OnInit {

  private isUpdate = false;

  paysForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<PaysAddComponent>,
              @Inject(MAT_DIALOG_DATA) public pays: Pays,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.paysForm = this.formBuilder.group({
      name: [this.pays.name, Validators.required],
      code: this.pays.code,
      longitude: this.pays.longitude,
      latitude: this.pays.latitude,
      id: this.pays.id
    })
  }

  close() {
    return this.dialogRef.close(this.isUpdate);
  }


  savePays() {
    if(this.paysForm.invalid)
      return;

    this.spinner.show();

    this.http.post(`${PAYS_SAVE__POST}`, this.paysForm.value).subscribe(data=>{
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
        this.snackBar.open('Ce pays n\'existe pas impossible de le modifier', 'x', {
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

}
