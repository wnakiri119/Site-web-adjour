import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColisViewComponent} from "./colis-view/colis-view.component";
import {ColisTrackingComponent} from "./colis-tracking/colis-tracking.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

const routes = [
  {path: ':code', component: ColisViewComponent},
  {path: 'track/:code', component: ColisViewComponent},
]

@NgModule({
  declarations: [ColisViewComponent, ColisTrackingComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ColisModule { }
