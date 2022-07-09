import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Colis} from "../../../_model/colis";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {StatusColis} from "../../../_model/_model_helper/status-colis";
import {
  COLIS_SET_IS_ARCHIVED_SAVE__POST,
  COLIS_SET_STATUS__POST,
  COLIS_STATE_FIND_ALL__GET, QR_CODE_GET_BYTES
} from "../../../_api_config/route-api";
import {ClientAddComponent} from "../client-add/client-add.component";
import {ColisAddComponent} from "../colis-add/colis-add.component";

@Component({
  selector: 'app-colis-view-detail',
  templateUrl: './colis-view-detail.component.html',
  styleUrls: ['./colis-view-detail.component.scss']
})
export class ColisViewDetailComponent implements OnInit {
  statusColis: StatusColis[] = []
  qrCode_url = QR_CODE_GET_BYTES;

  constructor(private dialogRef: MatDialogRef<ColisViewDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public colis: Colis,
              private http: HttpClient,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.colisStateFindAll();
  }

  close() {
    this.dialogRef.close(this.colis);
  }


  setArchived() {
    if(!confirm('êtes-vous sur de vouloir archiver ce colis?'))
      return;
    const formData = new FormData();
    formData.append('colisId', this.colis.id);

    this.spinner.show();
    this.http.post(`${COLIS_SET_IS_ARCHIVED_SAVE__POST}`, formData).subscribe(data=>{
      this.spinner.hide();
      this.colis.archiver = !this.colis.archiver;
      this.snackBar.open('le colis est archivé', 'x', {
        panelClass: 's-success',
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 10000
      })
    }, error => {
      this.spinner.hide();
      this.snackBar.open('Service momentanement indisponible. Veillez réessayez plus tard.', 'x', {
        panelClass: 's-error',
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 10000
      })
    })
  }

  colisStateFindAll() {
    this.http.get<any>(`${COLIS_STATE_FIND_ALL__GET}`).subscribe(data=>{
      this.statusColis = data;
    })
  }

  setStatutColis(status: StatusColis) {
    if(!confirm('êtes-vous sur de vouloir modifier le status de ce colis?'))
      return;
    const formData = new FormData();
    formData.append('statusId', ''+status.id)
    formData.append('colisId', this.colis.id);
    this.spinner.show();
    this.http.post(`${COLIS_SET_STATUS__POST}`, formData).subscribe(data=>{
      this.spinner.hide();
      this.colis.colisStatus = status;
      this.snackBar.open('le satus a été mis a jour avec succès', 'x', {
        panelClass: 's-success',
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 10000
      })
    }, error => {
      this.spinner.hide();
      this.snackBar.open('Service momentanement indisponible. Veillez réessayez plus tard.', 'x', {
        panelClass: 's-error',
        horizontalPosition: "right",
        verticalPosition: "top",
        duration: 10000
      })
    })

  }

  updateClient() {
    this.dialog.open(ClientAddComponent, {
      data: this.colis.client,
      width: '600px'
    })
  }

  updateColis() {
    const dialogRef = this.dialog.open(ColisAddComponent, {
      width: '850px',
      data: this.colis,
      disableClose: true
    });
  }

  downloadQRCODE() {

    const img = document.getElementById(this.colis.code) as HTMLImageElement;
    fetch(img.src)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'code.png', blob)
        const objectUrl: string = URL.createObjectURL(file);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = this.colis.code;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      })
  }
}
