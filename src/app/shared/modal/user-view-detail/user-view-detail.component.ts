import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Colis} from "../../../_model/colis";
import {emailValidator, matchingPasswords} from "../../../theme/utils/app-validators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pays} from "../../../_model/pays";
import {Utilisateur} from "../../../_model/utilisateur";
import {AppSettingService} from "../../../services/app-setting.service";
import {
  USER_ADD_ROLE__POST,
  USER_LOCK__POST,
  USER_ROMOVE_ROLE__POST,
  USER_SAVE__POST
} from "../../../_api_config/route-api";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-user-view-detail',
  templateUrl: './user-view-detail.component.html',
  styleUrls: ['./user-view-detail.component.scss']
})
export class UserViewDetailComponent implements OnInit {

  userForm: FormGroup;
  private roles: string[] = [];
  colisDataSource: MatTableDataSource<Colis> = new MatTableDataSource<Colis>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private isEdit = false;
  updatPassword = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              public appSettings: AppSettingService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              public dialogRef: MatDialogRef<UserViewDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public user: Utilisateur,) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: this.user.id,
      name: [{value: this.user.name, disabled: true}, Validators.required],
      surname: [{value: this.user.surname, disabled: true}, Validators.required],
      sexe: {value: this.user.sexe, disabled: true},
      username: [{value: this.user.username, disabled: true}, Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirm: ''
    }, {validators: matchingPasswords('password', 'passwordConfirm')})

    this.user.appRoles.forEach(r=>{
      this.roles.push(r.name);
    })
  }

  close() {
    this.dialogRef.close(this.isEdit);
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }

    if(!confirm('êtes-vous sur de vouloir modifier le mot de pass de ce client?'))
      return;

    this.spinner.show();
    this.http.post(`${USER_SAVE__POST}`, this.userForm.value).subscribe(resp=>{
      this.snackBar.open('le compte a été mise à jour avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      this.spinner.hide();

    }, error => {
      this.snackBar.open('Une erreur est survenu lors de la mise à jour du compe=te', 'x', {
        panelClass: 's-error',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      this.spinner.hide();
    })

  }

  isUser() {
    return this.roles.indexOf('USER') > -1;
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') > -1;
  }

  getRoleSelected(roleName) {
    const action = this.roles.indexOf(roleName) > -1;
    if(action)
      this.removeRoleToUser(roleName);
    else
      this.addRoleTouser(roleName);
  }

  lockAndAulockUser() {
    if(!confirm('êtes vous sur de vouloir blocker cette utilisateur ?'))
      return

    this.spinner.show();
    const formData = new FormData();
    formData.append('id', this.user.id);
    this.http.post(`${USER_LOCK__POST}`, formData).subscribe(data=>{
      this.spinner.hide();
      this.snackBar.open('L\'utilisateur a été blocqué avec succès','x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000,
      });
      this.user.actived = !this.user.actived;


    }, error => {
      this.spinner.hide();
      if (error.statusCode == 404) {
        this.snackBar.open('L\'utilisateur que vous essayez de bloquer n\'exixte pas. Veillez vérifier les valeurs transmises' ,'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000,
        });
      } else
        this.snackBar.open('Le service demandé est momentanement indisponible veillez reessayez plus tard' ,'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000,
        })
    })

  }

  private addRoleTouser(roleName: string) {
    if(!confirm('vous êtes sur le point d\'ajouter le droit ' + roleName + ' à '+ this.user.name + ' ' + this.user.surname + ' ' +
      'êtes-vous sur de vouloir poursuivre cette action ?'))
      return

    this.spinner.show();
    const formData = new FormData();
    formData.append('roleName', roleName);
    formData.append('idUser', this.user.id);

    this.http.post(`${USER_ADD_ROLE__POST}`, formData).subscribe(data=>{
      this.spinner.hide();
      this.snackBar.open('Le role a été ajouté avec succès','x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000,
      });

      this.roles.push(roleName);

    }, error => {
      this.spinner.hide();
      if (error.statusCode == 404) {
        this.snackBar.open('L\'utilisateur n\'a pas été trouvé. Veillez vérifier les valeurs transmises' ,'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000,
        });
      } else
        this.snackBar.open('Le service demandé est momentanement indisponible veillez reessayez plus tard' ,'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000,
        })
    })
  }

  private removeRoleToUser(roleName: string) {

    if (roleName == 'USER') {
      this.snackBar.open('vous ne pouvez pas retirer ce role','x', {
        panelClass: 's-warning',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000
      });

      return;
    }

    if(!confirm('vous êtes sur le point de retirer le droit ' + roleName + ' à '+ this.user.name + ' ' + this.user.surname + ' ' +
      'êtes-vous sur de vouloir poursuivre cette action ?')){
      return;
    }

    this.spinner.show();
    const formData = new FormData();
    formData.append('roleName', roleName);
    formData.append('idUser', this.user.id);

    this.http.post(`${USER_ROMOVE_ROLE__POST}`, formData).subscribe(data=>{
      this.spinner.hide();
      this.snackBar.open('Le role a été rétiré avec succès','x', {
        panelClass: 's-success',
        verticalPosition: "top",
        horizontalPosition: "right",
        duration: 10000,
      })


      this.roles = this.roles.filter(r=> r != roleName);

    }, error => {
      this.spinner.hide();
      if (error.statusCode == 404) {
        this.snackBar.open('L\'utilisateur n\'a pas été trouvé. Veillez vérifier les valeurs transmises' ,'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000,
        });
      } else
        this.snackBar.open('Le service demandé est momentanement indisponible veillez reessayez plus tard' ,'x', {
          panelClass: 's-error',
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 10000,
        })
    })
  }
}
