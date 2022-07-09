import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingService} from "../../services/app-setting.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-extimation-price',
  templateUrl: './extimation-price.component.html',
  styleUrls: ['./extimation-price.component.scss']
})
export class ExtimationPriceComponent implements OnInit {
  obtenirPrixForm: FormGroup;
  constructor(private http: HttpClient,
              public appSettings: AppSettingService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.obtenirPrixForm = this.formBuilder.group({
      poids: ['', Validators.required],
      largeur: ['', Validators.required],
      hauteur: ['', Validators.required],
      adressFrom: ['', Validators.required],
      adressTill: ['', Validators.required],
    });
  }

  askExpeditionPrice() {

  }
}
