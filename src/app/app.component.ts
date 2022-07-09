import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppSettingService} from "./services/app-setting.service";
import {AuthenticationService} from "./services/authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public appSettings: AppSettingService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    //chargement de l'utilisateur et ses roles dans l'application
    this.authService.parseJWT(this.authService.jwt);

    //chargement du fichier de langue
    this.appSettings.setLangue('fr');
  }
}
