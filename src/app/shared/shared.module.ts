import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatDialogModule} from "@angular/material/dialog";
import { CarouselMainComponent } from './carousel-main/carousel-main.component';
import {SWIPER_CONFIG, SwiperModule} from "ngx-swiper-wrapper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CarouselSmallComponent } from './carousel-small/carousel-small.component';
import { PartenairesComponent } from './partenaires/partenaires.component';
import { ExtimationPriceComponent } from './extimation-price/extimation-price.component';
import { BestTrajetCarrouselComponent } from './best-trajet-carrousel/best-trajet-carrousel.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NgxSpinnerModule} from "ngx-spinner";
import { AdressAddComponent } from './modal/adress-add/adress-add.component';
import { TarrificatonAddComponent } from './modal/tarrificaton-add/tarrificaton-add.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PaysAddComponent } from './modal/pays-add/pays-add.component';
import { VilleAddComponent } from './modal/ville-add/ville-add.component';
import {JWTInterceptorService} from "../_helpers/jwtinterceptor.service";
import { UserViewDetailComponent } from './modal/user-view-detail/user-view-detail.component';
import { ColisAddComponent } from './modal/colis-add/colis-add.component';
import {SearchUserPipe} from "../theme/utils/pipes/search-user.pipe";
import { ColisViewDetailComponent } from './modal/colis-view-detail/colis-view-detail.component';
import { ColisStateAddComponent } from './modal/colis-state-add/colis-state-add.component';
import { ExpeditionStateAddComponent } from './modal/expedition-state-add/expedition-state-add.component';
import { EmployerAddComponent } from './modal/employer-add/employer-add.component';
import { UtilisateurFilterComponent } from './component/utilisateur-filter/utilisateur-filter.component';
import {SearchByName} from "../theme/utils/pipes/search-string.pipe";
import { ChauffeurAddComponent } from './modal/chauffeur-add/chauffeur-add.component';
import { VehiculeAddComponent } from './modal/vehicule-add/vehicule-add.component';
import { ClientAddComponent } from './modal/client-add/client-add.component';
import { ClientInfoComponent } from './modal/client-info/client-info.component';
import {FooterComponent} from "../theme/components/footer/footer.component";
import { InvoicePrintComponent } from './modal/invoce-print/invoice-print.component';
import { InvoiceForManyColisComponent } from './modal/invoice-for-many-colis/invoice-for-many-colis.component';
import { ExpeditionAddComponent } from './modal/expedition-add/expedition-add.component';
import { ExpeditionSaveModalComponent } from './modal/expedition-save-modal/expedition-save-modal.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { ExpeditionDatailComponent } from './modal/expedition-datail/expedition-datail.component';
import { StatusModalComponent } from './modal/status-modal/status-modal.component';
import { MessageParamComponent } from './modal/message-param/message-param.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [ FooterComponent, CarouselMainComponent, CarouselSmallComponent, PartenairesComponent,
    ExtimationPriceComponent, BestTrajetCarrouselComponent, AdressAddComponent, TarrificatonAddComponent,
    PaysAddComponent, VilleAddComponent, UserViewDetailComponent,
    SearchUserPipe, ColisAddComponent, ColisViewDetailComponent,
    ColisStateAddComponent, ExpeditionStateAddComponent,
    EmployerAddComponent, UtilisateurFilterComponent, SearchByName, ChauffeurAddComponent, VehiculeAddComponent, ClientAddComponent, ClientInfoComponent, InvoicePrintComponent, InvoiceForManyColisComponent, ExpeditionAddComponent, ExpeditionSaveModalComponent, ExpeditionDatailComponent, StatusModalComponent, MessageParamComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,

        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        SwiperModule,
        ReactiveFormsModule,
        DragDropModule,
        NgxSpinnerModule,
      NgxMaterialTimepickerModule
    ],
    exports: [
        FlexLayoutModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        CarouselMainComponent,
        CarouselSmallComponent,
        PartenairesComponent,
        ExtimationPriceComponent,
        BestTrajetCarrouselComponent,
        SearchUserPipe,
        DragDropModule,
        NgxSpinnerModule,
        AdressAddComponent,
        TarrificatonAddComponent,
        UserViewDetailComponent,
        ColisAddComponent,
        FooterComponent,
        SearchByName,
    ],
  providers: [
    /*{
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }*/
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorService, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    DatePipe,
  ],

  entryComponents : [
    AdressAddComponent,
    TarrificatonAddComponent,
    UserViewDetailComponent,
    ColisAddComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
