import { Component, OnInit } from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";

@Component({
  selector: 'app-chargement-nationaux',
  templateUrl: './chargement-nationaux.component.html',
  styleUrls: ['./chargement-nationaux.component.scss']
})
export class ChargementNationauxComponent implements OnInit {

  constructor(public appSettings: AppSettingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('page2_1');

    div.innerHTML = this.appSettings.langue.page_cahrgement_nationaux;
  }

}
