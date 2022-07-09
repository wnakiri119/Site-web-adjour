import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PageComponent } from './pages/page.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';
import {SharedModule} from "./shared/shared.module";
import {MAT_MENU_SCROLL_STRATEGY} from "@angular/material/menu";
import {menuScrollStrategy} from "./theme/utils/scroll-strategy";
import {Overlay, OverlayContainer} from "@angular/cdk/overlay";
import {CustomOverlayContainer} from "./theme/utils/custom-overlay-container";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {JWTInterceptorService} from "./_helpers/jwtinterceptor.service";
import { MenuRouterComponent } from './theme/components/menu-router/menu-router.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        PageComponent,
        TopMenuComponent,
        AdminDashboardComponent,
        MenuRouterComponent,
      NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        {provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay]},
        {provide: OverlayContainer, useClass: CustomOverlayContainer},
        {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptorService, multi: true},
      //{provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
