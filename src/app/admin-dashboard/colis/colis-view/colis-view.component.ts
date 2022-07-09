import {Component, Inject, OnInit} from '@angular/core';
import {StatusColis} from "../../../_model/_model_helper/status-colis";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Colis} from "../../../_model/colis";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {
  COLIS_FIND_BY_CODE__GET,
  COLIS_SET_IS_ARCHIVED_SAVE__POST,
  COLIS_SET_STATUS__POST,
  COLIS_STATE_FIND_ALL__GET
} from "../../../_api_config/route-api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-colis-view',
  templateUrl: './colis-view.component.html',
  styleUrls: ['./colis-view.component.scss']
})
export class ColisViewComponent implements OnInit {

  statusColis: StatusColis[] = []
  colis: Colis;
  colisIsEmpty=false;
  constructor(private http: HttpClient,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(p=>{
      this.spinner.show();
      this.http.get<any>(`${COLIS_FIND_BY_CODE__GET}code=${p['code']}`).subscribe(data=>{
        this.colis = data;
        this.colisIsEmpty = false
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        this.colisIsEmpty = true;
      })
    })
  }

  imprimer() {

  }

}
