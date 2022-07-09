import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Colis} from "../../../_model/colis";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {Client} from "../../../_model/client";
import {emailValidator, numeriqueValidator} from "../../../theme/utils/app-validators";
import {CLIENT_SAVE__POST, USER_FIND_ALL__GET} from "../../../_api_config/route-api";
import {MAT_DATE_LOCALE} from "@angular/material/core";

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class ClientAddComponent implements OnInit {
  formGroup: FormGroup;
  private isUpdate = false;
  startDate = new Date(1980,0,1);

  constructor(public dialogRef: MatDialogRef<ClientAddComponent>,
              @Inject(MAT_DIALOG_DATA) public client: Client,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: this.client.id,
      name: [this.client.name, Validators.required],
      surname: [this.client.name, Validators.required],
      telephone: [this.client.telephone, Validators.compose([Validators.required, Validators.maxLength(9), numeriqueValidator])],
      email: [this.client.email, emailValidator],
      sexe: [this.client.sexe?this.client.sexe:'Homme', Validators.required],
      dateNaissance: this.client.dateNaissance,

    })
  }

  get f() {
    return this.formGroup.controls;
  }

  close() {
    this.dialogRef.close(this.isUpdate);
  }

  saveClient() {
    if(this.formGroup.invalid)
      return;

    this.spinner.show();

    this.http.post(`${CLIENT_SAVE__POST}`, this.formGroup.value).subscribe(data=>{
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
        this.snackBar.open('Imposible de modifier les données du colis car il n\'existe pas dans la base de donnée', 'x', {
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
