import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Adresse} from "../../../_model/adresse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ADRESS_SAVE__POST, PAYS_FIND_ALL__GET} from "../../../_api_config/route-api";
import {NgxSpinnerService} from "ngx-spinner";
import {Pays} from "../../../_model/pays";
import {Ville} from "../../../_model/ville";
import {Agence} from "../../../_model/agence";

@Component({
  selector: 'app-adress-add',
  templateUrl: './adress-add.component.html',
  styleUrls: ['./adress-add.component.scss']
})
export class AdressAddComponent implements OnInit {

  private isEdit: boolean;
  adressForm: FormGroup;
  pays: Pays[]=[];
  villes: Ville[];


  constructor(public dialogRef: MatDialogRef<AdressAddComponent>,
              @Inject(MAT_DIALOG_DATA) public adresse: Agence,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.adressForm = this.formBuilder.group({
      id: this.adresse.id,
      name: [this.adresse.name, Validators.required],
      villeId: [this.adresse.ville?.id, Validators.required]
    });

    this.findAllPays();
  }

  close() {
    this.dialogRef.close(this.isEdit);
  }

  saveAdresse() {
    if(this.adressForm.invalid)
      return;

    this.spinner.show();


    this.http.post(`${ADRESS_SAVE__POST}`, this.adressForm.value).subscribe(data=>{
      this.isEdit = true;
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
        this.snackBar.open('Cette adresse n\'existe pas impossible de le modifier', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });
      } else {
        this.snackBar.open('Une erreur est survenu lors de la création de l\'adresse. Veillez reessayer plus tard', 'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000
        });

      }

    })
  }


  findAllPays() {
    this.http.get<any>(`${PAYS_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.pays = data.content;
    })
  }

  setPays(p: Pays) {
    this.villes = p.villes;
  }
}
