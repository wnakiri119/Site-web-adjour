import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {FormControl, Validators} from "@angular/forms";
import {StatusColis} from "../../../_model/_model_helper/status-colis";
import {
  COLIS_STATE_FIND_ALL__GET,
  EXPEDITION_STATE_FIND_ALL__GET,
  EXPEDITON_SET_STATUS__GET
} from "../../../_api_config/route-api";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit {

  status: StatusColis[];
  formControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<StatusModalComponent>,
              @Inject(MAT_DIALOG_DATA) public currentStatus: StatusColis,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.findStatus();
  }


  findStatus() {
    if (this.currentStatus.indexForm == 0) {
      this.expeditionStateFindAll();
    } else
      this.colisStateFindAll();
  }

  colisStateFindAll() {
    this.spinner.show('colisState');
    this.http.get<any>(`${COLIS_STATE_FIND_ALL__GET}`).subscribe(data=>{
      this.status = data;
      this.spinner.hide('colisState');
    }, error => this.spinner.hide('colisState'))
  }

  expeditionStateFindAll() {
    this.spinner.show('colisState');
    this.http.get<any>(`${EXPEDITION_STATE_FIND_ALL__GET}`).subscribe(data=>{
      this.status = data;
      this.spinner.hide('colisState');
    }, error => this.spinner.hide('colisState'))
  }


  saveState() {
    if(this.formControl.invalid)
      return;

    this.spinner.show('colisState');
    this.http.get(`${EXPEDITON_SET_STATUS__GET+this.formControl.value}/${this.currentStatus.id}`).subscribe(data=>{
      this.snackBar.open('Status modifié avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 7000
      });
      this.spinner.hide('colisState');
      this.dialogRef.close(true);
    }, error => {
      this.spinner.hide('colisState');
      this.snackBar.open('Une erreur est survenue lors de la modification du status. Veillez contactez l\'administrateur.', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 7000
      });
    })
  }
}
