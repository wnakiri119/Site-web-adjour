import { Component, OnInit } from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public appSettings: AppSettingService) { }

  ngOnInit(): void {
  }

}
