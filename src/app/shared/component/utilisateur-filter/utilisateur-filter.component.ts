import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Utilisateur} from "../../../_model/utilisateur";
import {ACCOUNT_USER_FOR_EMPLOYER_FIND__GET} from "../../../_api_config/route-api";
import {smaller_role_employer} from "../../../_model/constante/global-setting";

@Component({
  selector: 'app-utilisateur-filter',
  templateUrl: './utilisateur-filter.component.html',
  styleUrls: ['./utilisateur-filter.component.scss']
})
export class UtilisateurFilterComponent implements OnInit {

  @Input("required") required: boolean;
  @Input("nameUser") nomUtilisateur: string;
  @Input() users: Utilisateur[];
  @Output("value") value: EventEmitter<Utilisateur> = new EventEmitter<Utilisateur>();

  showUser = false;

  formControl = new FormControl(this.nomUtilisateur, Validators.required);


  constructor() { }

  ngOnInit(): void {
  }


  showUserPannel() {
    this.showUser = !!this.formControl.value;

  }

  setIdUser(u: Utilisateur) {
    this.formControl.setValue(u.name +' '+u.surname);
    this.value.emit(u);
    this.showUser = false;
  }

}
