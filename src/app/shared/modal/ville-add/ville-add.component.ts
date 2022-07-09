import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Pays} from "../../../_model/pays";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {PAYS_FIND_ALL_REPOSITORY__GET, PAYS_SAVE__POST, VILLE_SAVE__POST} from "../../../_api_config/route-api";
import {Ville} from "../../../_model/ville";
import {PaysAddComponent} from "../pays-add/pays-add.component";

@Component({
  selector: 'app-ville-add',
  templateUrl: './ville-add.component.html',
  styleUrls: ['./ville-add.component.scss']
})
export class VilleAddComponent implements OnInit {

  private isUpdate = false;

  villeForm: FormGroup;
  pays: Pays[];

  constructor(public dialogRef: MatDialogRef<VilleAddComponent>,
              @Inject(MAT_DIALOG_DATA) public vile: Ville,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private dialogue: MatDialog,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.findPaysAll();

    this.villeForm = this.formBuilder.group({
      name: [this.vile.name, Validators.required],
      actived: this.vile.actived,
      longitude: this.vile.longitude,
      latitude: this.vile.latitude,
      paysId: [this.vile.paysId, Validators.required],
      id: this.vile.id
    })
  }

  close() {
    return this.dialogRef.close(this.isUpdate);
  }


  saveVille() {
    if(this.villeForm.invalid)
      return;


    this.spinner.show();

    this.http.post(`${VILLE_SAVE__POST}`, this.villeForm.value).subscribe(data=>{
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
        this.snackBar.open('Cette ville n\'existe pas impossible de le modifier', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });
      } else {
        this.snackBar.open('Une erreur est survenu lors de la création de la ville. Veillez reessayer plus tard', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });
      }

    })

  }


  findPaysAll() {
    this.http.get<any>(`${PAYS_FIND_ALL_REPOSITORY__GET}page=0&size=1000`).subscribe(data=>{
      this.pays = data._embedded.payses;
    })
  }

  openPaysAddModal() {
    let dialog = this.dialogue.open(PaysAddComponent, {
      width: '500px',
      data: new Pays(),
      disableClose: false
    });

    dialog.afterClosed().subscribe(data=>{
      if(data) {
        this.findPaysAll();
      }
    })
  }
}
