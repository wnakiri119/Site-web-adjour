import { Component, OnInit } from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";

@Component({
  selector: 'app-chargement-inter-nationaux',
  templateUrl: './chargement-inter-nationaux.component.html',
  styleUrls: ['./chargement-inter-nationaux.component.scss']
})
export class ChargementInterNationauxComponent implements OnInit {

  constructor(public appSettings: AppSettingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('page2');

    div.innerHTML = this.appSettings.langue.page_chargement_internationaux;
  }
}
