import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailsComponent } from './mails.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "ng2-ckeditor";

const routes=[
  {path: ':code/:id', component: MailsComponent}
]

@NgModule({
  declarations: [MailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class MailsModule { }
