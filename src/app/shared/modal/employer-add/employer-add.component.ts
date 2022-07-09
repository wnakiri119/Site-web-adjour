import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employer} from "../../../_model/employer";
import {HttpClient} from "@angular/common/http";
import {
  ACCOUNT_USER_FOR_EMPLOYER_FIND__GET,
  ACCOUNT_USER_FOR_SPECIFIQUE_ROLE__GET, AGENCE_FIND_ALL__GET,
  EMPLOYER_SAVE__POST
} from "../../../_api_config/route-api";
import {smaller_role_employer} from "../../../_model/constante/global-setting";
import {Utilisateur} from "../../../_model/utilisateur";
import {Agence} from "../../../_model/agence";
import {emailValidator} from "../../../theme/utils/app-validators";

@Component({
  selector: 'app-employer-add',
  templateUrl: './employer-add.component.html',
  styleUrls: ['./employer-add.component.scss']
})
export class EmployerAddComponent implements OnInit {

  employerForm: FormGroup;
  agenceIdControl: FormControl;
  accountIdControl: FormControl;

  private isEdit = false;
  users: Utilisateur[];
  showUser = true;
  agences: Agence[];
  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private spinner: NgxSpinnerService,
              public dialogRef: MatDialogRef<EmployerAddComponent>,
              @Inject(MAT_DIALOG_DATA) public employer: Employer) { }

  ngOnInit(): void {
    this.employerForm = this.formBuilder.group({
      id: this.employer?.id,
      telephone: [this.employer?.telephone, Validators.required],
      email: [this.employer?.email, emailValidator],
      matricule: this.employer?.matricule
    });

    this.agenceIdControl = new FormControl(this.employer?.agence?.id, Validators.required);
    this.accountIdControl = new FormControl(this.employer?.userAccount?.id, Validators.required);

    this.findAccountUserEmployer();
    this.findAgence();

  }


  findAccountUserEmployer() {
    this.http.get<any>(`${ACCOUNT_USER_FOR_SPECIFIQUE_ROLE__GET}roleName=${smaller_role_employer}`).subscribe(data=>{
      this.users = data;
    })
  }


  findAgence() {
    this.http.get<any>(`${AGENCE_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.agences = data.content;
    })
  }


  close() {
    this.dialogRef.close(this.isEdit);
  }

  saveEmployer() {
    this.employerForm.addControl('agenceId', this.agenceIdControl);
    this.employerForm.addControl('utilisateurId', this.accountIdControl)
    if (this.employerForm.invalid) {

      this.snackBar.open('Formulaire mal remplit veillez spécifier tous les champs obligatoire', 'x', {
        panelClass: 's-error',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      return;
    }

    this.spinner.show();

    this.http.post(`${EMPLOYER_SAVE__POST}`, this.employerForm.value).subscribe(data=>{
      this.snackBar.open('L\'action a été effectuée avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      this.spinner.hide();
      this.isEdit = true;
    }, error => {
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
      this.spinner.hide();
    })
  }

  accountClientSetId(value: Utilisateur) {
    this.accountIdControl.setValue(value.id);
  }

  showUserPannel() {
    this.showUser = !!this.agenceIdControl.value;

  }

  setIdUser(agence: Agence) {
    this.agenceIdControl.setValue(agence.id)
  }
}
