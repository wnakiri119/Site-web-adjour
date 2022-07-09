import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettingService} from "../../services/app-setting.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../../theme/utils/app-validators";
import {AUTHENTICATION} from "../../_api_config/route-api";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  singInForm: FormGroup;
  errorMessage;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private authService: AuthenticationService,
              public appSetting: AppSettingService) { }

  ngOnInit(): void {
    if(this.authService.isUser())
      this.router.navigate(['/'])

    this.singInForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required]
    })

  }

  sinGin() {
    if (this.singInForm.invalid) {
      return
    }

    this.spinner.show("auth");
    this.errorMessage = '';
    this.authService.login(this.singInForm.controls.username.value, this.singInForm.controls.password.value).subscribe(res=>{
      const jwt = res.headers.get('Authorization');
      this.authService.saveToke(jwt);
      this.authService.setuser(jwt);

      this.router.navigate(['/'])

      this.spinner.hide("auth");
    }, error => {
      console.log(error);
      if (error.status == 401 || error.status == 403) {
        this.errorMessage = this.appSetting.langue?.error_message_authentication_form_unauthorize;
      }

      this.spinner.hide("auth");
    })
  }

}
