import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargementNationauxComponent } from './chargement-nationaux/chargement-nationaux.component';
import { ChargementInterNationauxComponent } from './chargement-inter-nationaux/chargement-inter-nationaux.component';
import { TransportComponent } from './transport/transport.component';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import { EspaceRangementComponent } from './espace-rangement/espace-rangement.component';
import {SwiperModule} from "ngx-swiper-wrapper";


const routes = [
  {path: '', component: ChargementInterNationauxComponent},
  {path: 'chargement-nationaux', component: ChargementNationauxComponent},
  {path: 'transport', component: TransportComponent},
  {path: 'espace-rangement', component: EspaceRangementComponent},
]

@NgModule({
  declarations: [
    ChargementNationauxComponent,
    ChargementInterNationauxComponent,
    TransportComponent,
    EspaceRangementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    SwiperModule,
  ]
})
export class PrestationServiceModule { }
