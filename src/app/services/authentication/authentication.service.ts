import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Utilisateur} from "../../_model/utilisateur";
import {AppRole} from "../../_model/AppRole";
import {HttpClient} from "@angular/common/http";
import jwt_decode from 'jwt-decode';
import {AUTHENTICATION} from "../../_api_config/route-api";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: Utilisateur = new Utilisateur();
  private roles: string[] = [];
  private subjectUser: BehaviorSubject<Utilisateur> = new BehaviorSubject<Utilisateur>(this._user);


  constructor(private http: HttpClient) {

    //recupération des informtion de l'utilisateur
    //contenu dans le jeson web token chargé en mémoire

  }


  get user(): Utilisateur {
    return this.subjectUser.getValue();
  }

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(AUTHENTICATION, data, {observe:'response'})

  }

  public setuser(jwt: string) {
    this.parseJWT(jwt);
  }

  parseJWT(token: any) {
    if(token === null)
      return;
    const jwtHelper = jwt_decode(token);
    this.roles = [];
    this._user.username = jwtHelper.sub;
    this.roles = jwtHelper.roles;
    this._user.name = jwtHelper.name;
    this._user.surname = jwtHelper.surname;
    this._user.actived = jwtHelper.activated;

    this.subjectUser.next(this._user);
  }

  logOut() {
    this._user = new Utilisateur();
    this.subjectUser.next(this._user);
    localStorage.removeItem('token');
    this.roles = [];
  }

  saveToke(token) {
    localStorage.setItem('token', token);
    this.parseJWT(token);
  }


  get jwt():string {
    return localStorage.getItem('token');
  }

  isUser() {
    if(!this.user)
      return;
    return (this.roles.indexOf('USER') >=0)
  }

  isAdmin() {
    if(!this.user)
      return;
    return (this.roles.indexOf('ADMIN') >=0)
  }
}
