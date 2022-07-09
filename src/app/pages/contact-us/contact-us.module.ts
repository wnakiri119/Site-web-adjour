import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactUsComponent} from "./contact-us.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";

const routes = [
  {path: '', component: ContactUsComponent,}
]

@NgModule({
  declarations: [ ContactUsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    HttpClientModule
  ]
})
export class ContactUsModule { }
