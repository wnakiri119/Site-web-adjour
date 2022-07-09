import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";

const route: Routes=[
  {path: '', component: InvoicesComponent}
]

@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class InvoicesModule { }
