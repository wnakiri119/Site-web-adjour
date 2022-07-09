import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametreComponent } from './parametre.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {JWTInterceptorService} from "../../_helpers/jwtinterceptor.service";

const routes = [
  {path: '', component: ParametreComponent},
]


@NgModule({
  declarations: [ParametreComponent],
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
export class ParametreModule { }
