import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {StatusColis} from "../../../_model/_model_helper/status-colis";
import {COLIS_STATE_SAVE__POST, EXPEDITION_STATE_SAVE__POST, PAYS_SAVE__POST} from "../../../_api_config/route-api";

@Component({
  selector: 'app-colis-state-add',
  templateUrl: './colis-state-add.component.html',
  styleUrls: ['./colis-state-add.component.scss']
})
export class ColisStateAddComponent implements OnInit {

  private isUpdated=false;

  statusForm: FormGroup;

  private apiUrl;

  constructor(public dialogRef: MatDialogRef<ColisStateAddComponent>,
              @Inject(MAT_DIALOG_DATA) public state: StatusColis,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.statusForm = this.formBuilder.group( {
      id: this.state.id,
      value: [this.state.value, Validators.required],
      description: this.state.description
    })

    if(this.state.indexForm == 1)
      this.apiUrl = COLIS_STATE_SAVE__POST;
    else
      this.apiUrl = EXPEDITION_STATE_SAVE__POST;
  }


  close() {
    this.dialogRef.close(this.isUpdated);
  }

  saveState() {
    if(this.statusForm.invalid)
      return;

    this.spinner.show();

    this.http.post(`${this.apiUrl}`, this.statusForm.value).subscribe(data=>{
      this.isUpdated = true;
      this.spinner.hide();
      this.snackBar.open('l\'opération c\'est effectuée avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      });
    }, error => {
      this.spinner.hide();
      this.snackBar.open('Une erreur est survenu lors de la création du pays. Veillez reessayer plus tard', 'x', {
        panelClass: 's-error',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      });

    })

  }
}
