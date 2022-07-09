import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {emailValidator, matchingPasswords} from "../../theme/utils/app-validators";
import {AppSettingService} from "../../services/app-setting.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              public appSettings: AppSettingService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sexe: 'M',
      username: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfir: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      accept: ['', Validators.requiredTrue],
      dateCreated: new FormControl({value: '01-12-12', disabled: true}),
      dateLastUpdate: new FormControl({value: '01-12-12', disabled: true})
    }, {validators: matchingPasswords('password', 'passwordConfir')})
  }

  updateUser() {

  }
}
