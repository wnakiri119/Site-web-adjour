import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Expedition} from "../../../_model/expedition";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {
  AGENCE_FIND_ALL__GET,
  CHAUFFEUR_FIND_ALL_PAGEABLE__GET, EXPEDITION_SAVE__POST,
  VEHICULE_FIND_ALL_PAGEABLE__GET
} from "../../../_api_config/route-api";
import {Agence} from "../../../_model/agence";
import {Vehicule} from "../../../_model/vehicule";
import {Chauffeur} from "../../../_model/chauffeur";

@Component({
  selector: 'app-expedition-save-modal',
  templateUrl: './expedition-save-modal.component.html',
  styleUrls: ['./expedition-save-modal.component.scss']
})
export class ExpeditionSaveModalComponent implements OnInit {

  expeditionForm: FormGroup;
  agence: Agence[];
  vehicules: Vehicule[];
  chauffeurs: Chauffeur[];

  private isUpdate = false;
  constructor(private dialogRef: MatDialogRef<ExpeditionSaveModalComponent>,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              @Inject(MAT_DIALOG_DATA) public expeditions: Expedition) { }

  ngOnInit(): void {
    const time = this.expeditions.heureDepart?this.expeditions.heureDepart.split(':'):[];
    this.expeditionForm = this.formBuilder.group({
      vehiculeId: this.expeditions.vehicule?.id,
      chauffeurId: [this.expeditions.chauffeur?.id, Validators.required],
      adressDestinationId: [this.expeditions.arrive?.id, Validators.required],
      dateDepart: [this.expeditions.dateDepart?this.expeditions.dateDepart:new Date(), Validators.required],
      heureDepart_heure: [time[0], Validators.compose([Validators.required, Validators.max(24)])],
      heureDepart_minute: [time[1], Validators.compose([Validators.required, Validators.max(60)])]
    });

    this.findAddress();
    this.chauffeurFindAll();
    this.vehiculeFindAll();
  }

  close() {
    this.dialogRef.close(this.isUpdate);
  }


  findAddress() {
    this.spinner.show('expeditionAdd');
    this.http.get<any>(`${AGENCE_FIND_ALL__GET}page=0&size=200`).subscribe(data=>{
      this.agence=data.content;
      this.spinner.hide();
    }, error => this.spinner.hide('expeditionAdd'))
  }

  chauffeurFindAll() {
    this.spinner.show('expeditionAdd');
    this.http.get<any>(`${CHAUFFEUR_FIND_ALL_PAGEABLE__GET}page=0&size=200`).subscribe(data=>{
      this.chauffeurs=data.content;
      this.spinner.hide();
    }, error => this.spinner.hide('expeditionAdd'))
  }

  vehiculeFindAll() {
    this.spinner.show('expeditionAdd');
    this.http.get<any>(`${VEHICULE_FIND_ALL_PAGEABLE__GET}page=0&size=200`).subscribe(data=>{
      this.vehicules=data.content;
      this.spinner.hide('expeditionAdd');
    }, error => this.spinner.hide('expeditionAdd'))
  }

  saveExpedition() {

    if(this.expeditionForm.invalid)
      return;

    const heure = (''+this.expeditionForm.controls.heureDepart_heure.value).length==1?'0'+this.expeditionForm.controls.heureDepart_heure.value:this.expeditionForm.controls.heureDepart_heure.value;
    const min = (''+this.expeditionForm.controls.heureDepart_minute.value).length==1?'0'+this.expeditionForm.controls.heureDepart_minute.value:this.expeditionForm.controls.heureDepart_minute.value;
    this.spinner.show('expeditionAdd');
    this.expeditions.heureDepartString = heure + ':' +min+':00';
    this.expeditions.adressDestinationId = this.expeditionForm.controls.adressDestinationId.value;
    this.expeditions.vehiculeId = this.expeditionForm.controls.vehiculeId.value;
    this.expeditions.dateDepart = this.expeditionForm.controls.dateDepart.value;
    this.expeditions.chauffeurId = this.expeditionForm.controls.chauffeurId.value;




    this.http.post(`${EXPEDITION_SAVE__POST}`, this.expeditions).subscribe(data=>{
      this.spinner.hide('expeditionAdd');
      this.snackBar.open('l\'action a été exécuté avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 10000
      });
      this.isUpdate = true;
    }, error => {
      if(error.statusCode == 422)
        this.snackBar.open('Données envoyez incorrect. Le système ne parvient pas a mettre en relation certaine table', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 10000
        });
      else if(error.statusCode == 401 || error.statusCode==403)
        this.snackBar.open('Vous n\'avez pas le droit d\'effectuer cette action. Veillez contactez votre administrateur', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 10000
        });

      else {
        this.snackBar.open('Service indisponible. Veillez contacter l\'administrateur.', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 10000
        });
      }
      this.spinner.hide('expeditionAdd');
    });

  }
}
