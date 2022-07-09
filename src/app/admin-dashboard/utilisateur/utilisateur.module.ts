import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurComponent } from './utilisateur.component';
import {SharedModule} from "../../shared/shared.module";
import {Route, RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {JWTInterceptorService} from "../../_helpers/jwtinterceptor.service";

const routes: Route[] = [
  {path: '', component: UtilisateurComponent}
]

@NgModule({
  declarations: [UtilisateurComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorService, multi: true},
  ]
})
export class UtilisateurModule { }
