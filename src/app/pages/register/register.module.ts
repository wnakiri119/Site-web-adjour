import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "./register.component";
import {SharedModule} from "../../shared/shared.module";
import {Route, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Route[] = [
  {path: '', component: RegisterComponent}
]

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
