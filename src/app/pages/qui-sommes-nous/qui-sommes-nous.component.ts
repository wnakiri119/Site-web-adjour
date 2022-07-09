import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppSettingService} from "../../services/app-setting.service";

@Component({
  selector: 'app-qui-sommes-nous',
  templateUrl: './qui-sommes-nous.component.html',
  styleUrls: ['./qui-sommes-nous.component.scss']
})
export class QuiSommesNousComponent implements OnInit, AfterViewInit {

  constructor(public  appSettings: AppSettingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const div = document.getElementById('page1');

    div.innerHTML = this.appSettings.langue.qui_somme_nous;
  }



}
