import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {french_url} from "../config/langage-setting";
import {BehaviorSubject} from "rxjs";

export interface Langage {
  region_visite,
  enterprise_name,
  enterprise_slogan,
  enterprise_email,
  enterprise_phone,
  home_label,
  enterprise_adress,
  home_register_btn,
  home_signIn_btn,
  home_change_langage,
  home_title_label,
  home_subtitle_label,
  form_ask_price_from,
  form_ask_price_till,
  form_ask_price_poids,
  form_ask_price_hauteur,
  form_ask_price_largeur,
  form_ask_price_submit,
  home_anonce_title,
  home_small_describe_title,
  home_small_describe_content,
  home_small_describe_first_rubrique_title,
  home_small_describe_first_rubrique_contain,
  home_small_describe_second_rubrique_title,
  home_small_describe_second_rubrique_contain,
  home_small_describe_third_rubrique_title,
  home_small_describe_third_rubrique_contain,
  home_ask_extimation_price_form_title,
  home_ask_extimation_price_form_label_poids,
  home_ask_extimation_price_form_label_largeur,
  home_ask_extimation_price_form_label_hauteur,
  home_ask_extimation_price_form_label_adress_from,
  home_ask_extimation_price_form_label_address_till,
  home_moyen_transport_avion,
  home_moyen_transport_bus,
  home_moyen_transport_camionette,
  home_ask_extimation_price_form_label_submit,
  home_moyen_transport_train,
  home_moyen_transport_bateau,
  home_avis,
  home_best_trajet,
  pays_name_1,
  pays_name_2,
  pays_name_3,
  pays_name_4,
  pays_name_5,
  pays_name_6,
  pays_name_7,
  pays_name_8,
  pays_name_9,
  home_inscription_section_title,
  home_inscription_section_content,
  home_inscription_section_avantage_title1,
  home_inscription_section_avantage_title2,
  home_inscription_section_avantage_title3,
  home_inscription_section_avantage_title4,
  home_inscription_section_avantage_content1,
  home_inscription_section_avantage_content2,
  home_inscription_section_avantage_content3,
  home_inscription_section_avantage_content4,
  home_avantage_title_1,
  home_avantage_content_1,
  home_avantage_title_2,
  home_avantage_content_2,
  home_avantage_title_3,
  home_avantage_content_3,
  home_avantage_title_4,
  home_avantage_content_4,
  home_partenaire_title,
  home_bande_annonce_title,
  contact_us_form_title,
  contact_us_form_label_nom,
  contact_us_form_placehold_nom,
  contact_us_form_label_email,
  contact_us_form_placehold_email,
  contact_us_form_label_subject,
  contact_us_form_placehold_subject,
  contact_us_form_label_message,
  contact_us_form_placehold_message,
  contact_us_form_send_btn,
  footer_col_1_title,
  footer_col_1_apros_li_1,
  footer_col_1_apros_li_2,
  footer_col_1_apros_li_3,
  footer_col_1_apros_li_4,
  footer_col_2_title,
  footer_col_3_title,

  register_form_title,
  register_form_name,
  register_form_surname,
  register_form_sexe,
  register_form_username,
  register_form_password,
  register_form_password_confirm,
  register_form_error_name_required,
  register_form_error_surname_required,
  register_form_error_username_required,
  register_form_error_username_invalid_email,
  register_form_error_password_required,
  register_form_error_password_minlength,
  register_form_error_password_confirm,
  unaccepted_political_confidentiality,
  btn_save,
  signIn_form_title,
  btn_reset,
  political_confidentiality_innerHTML,
  error_message_register_form_form_mal_rempli,
  error_message_register_form_username_exist,
  error_message_authentication_form_unauthorize,
  top_menu_go_to_account_btn,
  top_menu_deconnexion_btn,
  error_message_default_register_form,
  success_message_default_register_form,
  prestation_service_menu,
  prestation_service_menu_item_1,
  prestation_service_menu_item_2,
  prestation_service_menu_item_3,
  prestation_service_menu_item_1_1,
  prestation_service_menu_item_1_2,
  qui_somme_nous,
  page_chargement_internationaux,
  page_cahrgement_nationaux,
  page_chargement_transport,
  page_expace_rangement,


}


@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  public codes = ['fr','en']
  private _langue: Langage;
  private _code_langue: BehaviorSubject<string> = new BehaviorSubject<string>(this.codes[0]);


  inFoEnterPriseFR = {
    name: 'BINSARL',
    slogan: 'klqdsfqjlfn,qkljfqklfjklqsjfklqsjfklqklf',
    contact1: '689-243-85',
    contact2: '689-253-85',
    contact3: '689-253-85',
    email: 'gqshjfq@qdghqj.com',
    adrese1Tile: 'Tchad',
    adrese1Value: 'Avenue des 5 manguier',
    adrese2Title: 'Cameroun',
    adrese2Value: 'Akoa soudanaise',
  }


  constructor(private http: HttpClient) { }

  setLangue(symbole: string) {
    if(symbole == 'fr')
      this.http.get<Langage>(`${french_url}`).subscribe(data=> {
        this._langue = data;
        this._code_langue.next(symbole);
      })
  }


  get langue(): Langage {
    return this._langue;
  }

  get code_langue(): string {
    return this._code_langue.getValue();
  }
}
