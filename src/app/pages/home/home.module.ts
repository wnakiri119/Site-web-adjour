import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {Router, RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {SwiperModule} from "ngx-swiper-wrapper";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SwiperModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
