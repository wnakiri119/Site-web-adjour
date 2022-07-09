import { Component, OnInit } from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {

  constructor(public appSettings: AppSettingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('page2_2');

    div.innerHTML = this.appSettings.langue.page_chargement_transport;
  }
}
