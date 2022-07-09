import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {emailValidator} from "../../theme/utils/app-validators";
import {AppSettingService} from "../../services/app-setting.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              public appSettings: AppSettingService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })
  }


  sendFormulaire() {
    if(this.contactForm.invalid)
      return;

  }
}
