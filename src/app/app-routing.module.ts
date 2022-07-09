import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PageComponent} from "./pages/page.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";


const routes: Routes = [
  {path: '', component: PageComponent, children: [
      {path: '', loadChildren: ()=> import('./pages/home/home.module').then(m=> m.HomeModule)},
      {path: 'contact-us', loadChildren: ()=> import('./pages/contact-us/contact-us.module').then(m=> m.ContactUsModule), data: {path: 'contact-us'}},
      {path: 'register', loadChildren: ()=> import('./pages/register/register.module').then(m=> m.RegisterModule), data: {path: 'register'}},
      {path: 'sign-in', loadChildren: ()=> import('./pages/sing-in/sing-in.module').then(m=> m.SingInModule), data: {path: 'sign-in'}},
      {path: 'about-us', loadChildren: ()=> import('./pages/qui-sommes-nous/qui-sommes-nous.module').then(m=> m.QuiSommesNousModule), data: {path: 'about-us'}},
      {path: 'services', loadChildren: ()=> import('./pages/prestation-service/prestation-service.module').then(m=> m.PrestationServiceModule), data: {path: 'services'}},
    ]
  },

  {path: 'dashboard', component: AdminDashboardComponent, children: [
      {path: '', loadChildren: ()=> import('./admin-dashboard/trajets/trajets.module').then(m=> m.TrajetsModule), data: {path: 'trajet'}},
      {path: 'utilisateurs', loadChildren: ()=> import('./admin-dashboard/utilisateur/utilisateur.module').then(m=> m.UtilisateurModule), data: {path: 'utilisateur'}},
      {path: 'colis', loadChildren: ()=> import('./admin-dashboard/colis/colis.module').then(m=> m.ColisModule), data: {path: 'colis'}},
      {path: 'parameter', loadChildren: ()=> import('./admin-dashboard/parametre/parametre.module').then(m=> m.ParametreModule), data: {path: 'parameter'}},
      {path: 'profil', loadChildren: ()=> import('./admin-dashboard/profile/profile.module').then(m=> m.ProfileModule), data: {path: 'profil'}},
      {path: 'mails', loadChildren: ()=> import('./admin-dashboard/mails/mails.module').then(m=> m.MailsModule), data: {path: 'emails'}},
      {path: 'invoices', loadChildren: ()=> import('./admin-dashboard/invoices/invoices.module').then(m=> m.InvoicesModule), data: {path: 'invoices'}},
    ]
  },
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
