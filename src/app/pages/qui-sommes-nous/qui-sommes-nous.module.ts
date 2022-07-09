import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuiSommesNousComponent } from './qui-sommes-nous.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";


const routes = [
  {path: '', component: QuiSommesNousComponent}
]

@NgModule({
  declarations: [QuiSommesNousComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class QuiSommesNousModule { }
