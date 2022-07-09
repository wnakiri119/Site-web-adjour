import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModelMail} from "../../_model/modelMail";
import {
  CLIENT_FIND_ALL_BY_COLIS__POST,
  CLIENT_FIND_BY_COLIS__GET,
  CLIENT_FIND_BY_EXPEDITION__GET,
  EMAIL_SEND_BY_COLIS_OR_EXPEDITION_ID__POST,
  MODEL_EMAIL_DELETE__DELETE,
  MODEL_EMAIL_FIND_ALL__GET,
  TAGS_IN_EMAILS_FIND_ALL__GET
} from "../../_api_config/route-api";
import {TagsInEmails} from "../../_model/tags-in-emails";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../_model/client";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.scss']
})
export class MailsComponent implements OnInit {
  private regex = /#[A-Z_]+\S/g;

  formEmail: FormGroup;
  modelEmails: ModelMail[];

  currentEmailTemplate: ModelMail;
  ckeditorContent: any;

  //verifi si l'utilisateur a selectioné un tag
  replace: boolean;
  //controle l'affichage du popup de selection de tag
  showTagPop: boolean;
  currentTagName: string;

  tags: TagsInEmails[] = [];
  currentTag: TagsInEmails;

  regexFind: string[];

  //data for url
  expeditionId: string;
  /*what client to send email*/
  code: number;
  colisIds: string[];

  ids;
  //lits client where mail as send
  clients: Client[];

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    /**
     *find all tags
     *
     * word begining by #caracter
     */
    this.findAllTag();

    this.modelEmailFindAll();

    //content mails of client (whatToDo==3)
    let emailsClients: string;

    this.activatedRoute.params.subscribe(param=>{
      this.code = param['code'];
      if(this.code == 1){ //pour les clients d'une expédition
        this.expeditionId = atob(param['id']);
        this.ids = atob(param['id']); //le backend attends un tableau alors on split
        this.clientFindByExpedition();
      } else if (this.code == 2) { //pour les clients par colis
        this.colisIds = atob(param['id']).split(',');
        this.ids = atob(param['id']);

        this.clientFindByColis();
      } else if (this.code == 3) {
        const emails = atob(param['id']).split(',');

        emailsClients = emails.map(email=>{
          return email;
        }).join(';');
      }
    })

    this.formEmail = this.formBuilder.group({
      id: this.currentEmailTemplate?.id,
      subject: [this.currentEmailTemplate?.subject, Validators.required],
      message: [this.currentEmailTemplate?.message, Validators.required],
      destinationAdresse: [emailsClients, Validators.required],
      whatToDo: this.code,
      colisOrExpeditionsId: this.ids
    });

  }

  findAllTag() {
    this.http.get<any>(`${TAGS_IN_EMAILS_FIND_ALL__GET}`).subscribe(data=>{
      this.tags = data;
    })
  }

  modelEmailFindAll() {
    this.http.get<any>(`${MODEL_EMAIL_FIND_ALL__GET}`).subscribe(data=>{
      this.modelEmails = data;
    })
  }

  modelEmailDelete(id) {
    if (!confirm('le template sera supprimé. Continuer?')) {
      return;
    }
    this.spinner.show();
    this.http.delete(`${MODEL_EMAIL_DELETE__DELETE+id}`).subscribe(data=>{
      this.spinner.hide();
      this.snackBar.open('Le template a été supprimé avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      this.modelEmailFindAll();
    }, error => {
      this.spinner.hide();
      this.snackBar.open('Impossible de supprimer le template', 'x', {
        panelClass: 's-error',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });
    });
  }

  selectTemplate(template: ModelMail) {
    this.formEmail.controls.id.setValue(template.id);
    this.formEmail.controls.subject.setValue(template.subject);
    this.formEmail.controls.message.setValue(template.message);
  }



  saveEmailTemplate(save: boolean) {
    if (this.formEmail.invalid) {
      this.snackBar.open('Veillez remplir tous les champs oblogatoires', 'x', {
        panelClass: 's-warning',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      return;
    }

    this.formEmail.addControl('saveOptional', new FormControl(save));

    this.spinner.show();
    this.http.post(`${EMAIL_SEND_BY_COLIS_OR_EXPEDITION_ID__POST}`, this.formEmail.value).subscribe(data=>{
      this.spinner.hide();
      this.snackBar.open('Le mail a été envoyé' + (save?'et enregistré':'') + ' avec succès', 'x', {
        panelClass: 's-success',
        verticalPosition: 'top',
        horizontalPosition: "right",
        duration: 10000
      });

      //on met a jour la liste des template
      if(save) this.modelEmailFindAll();


    }, error => {
      if (error.statusCode == 406) {
        this.snackBar.open('Formulaire mal remplit. Veillez remplir correctement tous les champs.', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: "right",
          duration: 10000
        });
      } else {
        this.snackBar.open('Service Momentanement indisponible. Veillez réessayez plus tard.', 'x', {
          panelClass: 's-error',
          verticalPosition: 'top',
          horizontalPosition: "right",
          duration: 10000
        });
      }
      this.spinner.hide();
    })

  }



  onChange(words: string) {
    //on recupère les occurances trouvées
    this.regexFind = words.match(this.regex);

    if (this.regexFind) {
      const regexLength = this.regexFind.length;

      this.showTagPop = true;
      //on recupère le dernier élément de la list des valeur
      this.currentTagName = this.regexFind[regexLength - 1];

      //on retire le prenier et le dernier caractère
      this.currentTagName = this.currentTagName.substring(this.currentTagName.length - 1, 1)
    } else {
      this.showTagPop = false;
    }

    //contient le contenu de l'éditeur sans le tag

  }



  clientFindByExpedition() {
    this.spinner.hide();
    this.http.get<any>(`${CLIENT_FIND_BY_EXPEDITION__GET+this.expeditionId}`).subscribe(data=>{
      this.formEmail.controls.destinationAdresse.setValue(data.map(client=>{
        if(client.email) return client.email;
      }).join(';'));

      this.spinner.hide();
    }, error => this.spinner.hide())
  }


  clientFindByColis() {
    const formData = new FormData();
    this.spinner.show();
    this.colisIds.forEach(id=>{
      formData.append('colisIds', id);
    })
    this.http.post<any>(`${CLIENT_FIND_ALL_BY_COLIS__POST}`, formData).subscribe(data=>{
      this.clients = data;
      this.formEmail.controls.destinationAdresse.setValue(this.clients.map(client=>{
        if(client.email) return client.email;
      }).join(';'));

      this.spinner.hide();
    }, error => this.spinner.hide());
  }


  onEditorChange(event) {

  }

  onReady(event) {

  }

  onFocus(event) {

  }

  onBlur($event: any) {

  }

  onContentDom($event: any) {

  }

  onFileUploadRequest($event: any) {

  }

  onFileUploadResponse(event) {


  }

  onPaste(event) {

  }

  onDrop($event: any) {

  }



  choixTag(t: TagsInEmails) {
    this.currentTag = t;
    this.formEmail.controls.message.setValue((this.formEmail.controls.message.value as string).replace('#'+this.currentTagName, this.currentTag.name));

    this.regexFind = null;
    this.showTagPop = false;


  }
}
