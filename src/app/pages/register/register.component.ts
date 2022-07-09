import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {emailValidator, matchingPasswords} from "../../theme/utils/app-validators";
import {AppSettingService} from "../../services/app-setting.service";
import {USER_SAVE__POST} from "../../_api_config/route-api";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submited: boolean;
  errorMessage: string
  send: boolean;
  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              public appSettings: AppSettingService,
              private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.isUser())
      this.router.navigate(['/'])

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sexe: 'Homme',
      username: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      accept: ['', Validators.requiredTrue]
    }, {validators: matchingPasswords('password', 'passwordConfirm')})
  }

  saveUser() {
    this.submited = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.submited = false;
    this.errorMessage = '';
    this.send = true;
    this.spinner.show("register");
    this.http.post(`${USER_SAVE__POST}`, this.registerForm.value, {observe: "response"}).subscribe(resp=>{

      const jwt = resp.headers.get('Authorization');
      this.authService.saveToke(jwt);
      this.authService.setuser(jwt);

      this.router.navigate(['/'])

      this.spinner.hide("register");

    }, error => {
      if (error.status == 406) {
        this.errorMessage = this.appSettings.langue?.error_message_register_form_form_mal_rempli;
      } else if (error.status == 409) {
        this.errorMessage = this.appSettings.langue?.error_message_register_form_username_exist;
      }

      this.spinner.hide("register");
    })

  }

  ngAfterViewInit(): void {
    //on ajoute le lien de la politique de sécurité à tous les span qui contiennent la class "politique-confidentialite"
    const divPoliticalConfidentialities = document.querySelector('.politique-confidentialite');
    divPoliticalConfidentialities.innerHTML = this.appSettings.langue?.political_confidentiality_innerHTML;

  }

}
