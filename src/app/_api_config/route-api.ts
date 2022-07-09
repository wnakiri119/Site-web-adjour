import {environment} from "../../environments/environment";

const BASE_URL = environment.BASE_URL;
const API_URL = environment.API_URL;
const API_URL_REPOSITORY = environment.API_URL_REPOSITORY;


/*--------------------- PUBLIC CONTROLER -------------------------------*/

const USER_SAVE__POST = API_URL+'/forAny/user-save';
const VILLE_FIND_ALL__GET = API_URL+'/forAny/ville-find-all?';
const PAYS_FIND_ALL__GET = API_URL+'/forAny/pays-find-all?';
const AGENCE_FIND_ALL__GET = API_URL+'/forAny/agence-find-all?';
const GRILLE_TARRIFAIRE_FIND_ALL__GET = API_URL+'/forAny/grille-find-all?';
const PAYS_FIND_ALL_REPOSITORY__GET=API_URL_REPOSITORY+'/pays?';
const AUTHENTICATION = BASE_URL+'/login';
const ENTERPRISE__GET_INFO__GET = API_URL+'/forAny/enterprise/';


/*============================= END ======================================*/



/*------------------------- PRIVATE GUICHETIER ----------------------------------*/

const COLIS_SAVE__POST=API_URL+'/guichetier-ctl/colis-save';
const DESTINATAIRE_UPDATE__POST=API_URL+'/guichetier-ctl/colis-save';
const CLIENT_SAVE__POST=API_URL+'/guichetier-ctl/client-save';
const COLIS_STATE_FIND_ALL__GET=API_URL+'/guichetier-ctl/colis-state-find-all';
const CLIENT_FIND_ALL__GET=API_URL+'/guichetier-ctl/client-find-all?';
const CLIENT_FIND_BY_NAME__LIST__GET=API_URL+'/guichetier-ctl/client-find-by-name?';

const COLIS_FIND_BY_CLIENT__PAGEABLE__GET=API_URL+'/guichetier-ctl/colis-find-by-client?';
const COLIS_FIND_BY_AGENCE_PAGEABLE__GET=API_URL+'/guichetier-ctl/colis-find-by-agence?';
const COLIS_DELETE_BY_ID__DELETE=API_URL+'/guichetier-ctl/colis-delete/';
const COLIS_FIND_BY_CLIENT_AND_STATE_IS_ONE__GET=API_URL+'/guichetier-ctl/colisFindByClientAndStateIsOne/';
const INVOICE_SAVE__POST=API_URL+'/guichetier-ctl/generatedInvoice';
const INVOICE_FIND_BY_CLIENT_ID__GET=API_URL+'/guichetier-ctl/invoicForClient/';
const AGENCE_FIND_BY_VILLE=API_URL+'/guichetier-ctl/agence-find-ville';
const EXPEDITION_FIND_ALL__PAGEABLE__GET=API_URL+'/guichetier-ctl/expedition-find-all?';
const COLIS_FIND_BY_EXPEDITION__GET=API_URL+'/guichetier-ctl/colis-find-by-expedition/';
const TAGS_IN_EMAILS_FIND_ALL__GET=API_URL+'/guichetier-ctl/email-find-all-tags';
const CLIENT_FIND_BY_EXPEDITION__GET=API_URL+'/guichetier-ctl/client-find-by-expedition/';
const CLIENT_FIND_BY_COLIS__GET=API_URL+'/guichetier-ctl/client-find-by-colis';
const CLIENT_FIND_ALL_BY_COLIS__POST=API_URL+'/guichetier-ctl/client-find-all-by-colis';
const EMAIL_SEND_BY_COLIS_OR_EXPEDITION_ID__POST=API_URL+'/guichetier-ctl/email-send-by-colis-or-expedition';
const MODEL_EMAIL_FIND_ALL__GET=API_URL+'/guichetier-ctl/model-email-find-all';
const MODEL_EMAIL_DELETE__DELETE=API_URL+'/guichetier-ctl/model-email/';


/*========================== ROOT PATH =======================================*/

const USER_FIND_ALL__GET=API_URL+'/for-root/user-find-all?';
const USER_ROMOVE_ROLE__POST=API_URL+'/for-root/user-remove-role';
const USER_LOCK__POST=API_URL+'/for-root/user-lock';
const USER_ADD_ROLE__POST=API_URL+'/for-root/user-add-role';
const USER_FIND_IS_ACTIVATED__GET=API_URL+'/for-root/user-find-all-actived?';


const VILLE_SAVE__POST=API_URL+'/for-root/ville_save';
const ADRESS_SAVE__POST = API_URL+'/for-root/agence_save';
const PAYS_SAVE__POST=API_URL+'/for-root/pays_save';
const CHAUFFEUR_SAVE__POST=API_URL+'/for-root/chauffeur_save';
const VEHICULE_SAVE__POST=API_URL+'/for-root/vehicule_save';
const EMPLOYER_SAVE__POST=API_URL+'/for-root/employer_save';
const EMPLOYER_FIND_ALL__PAGEABLE__GET=API_URL+'/for-root/employer_find_all?'

const TARIFICATION_SAVE__POST=API_URL+'/for-root/tarification-save';


const COLIS_FIND_IS_ARCHIVED__PAGEABLE__GET=API_URL+'/for-root/colis-find-isarchivated?'
const EXPEDITION_ARCHIVED_FIND_ALL__PAGEABLE__GET=API_URL+'/for-root/expedition-archived-find-all?'
const COLIS__FIND_ALL__PAGEABLE__GET=API_URL+'/for-root/colis-find-all?'
const COLIS_FIND_ARCHIVED_IS_FALSE__GET=API_URL+'/for-root/colis-find-archived-is-false?';
const COLIS_STATE_SAVE__POST=API_URL+'/for-root/colis-state-save';

const ACCOUNT_USER_FOR_EMPLOYER_FIND__GET=API_URL+'/for-root/find-account-for-employer?';
const ACCOUNT_USER_FOR_SPECIFIQUE_ROLE__GET=API_URL+'/for-root/user_content_specifique_role?';

const INVOICE_FIND_ALL_PAGEABLE__GET=API_URL+'/for-root/invoiceFindAll?';
const INVOICE_DELETE__DELETE=API_URL+'/for-root/invoiceDelete/';
const ENTERPRISE_SAVE__POST=API_URL+'/for-root/enterpriseSave'



/*============================ CHEF SERVICE =====================================*/

const COLIS_SET_STATUS__POST=API_URL+'/master_ctrl/colis-set-status';
const COLIS_SET_IS_ARCHIVED_SAVE__POST=API_URL+'/master_ctrl/colis-set-isarchived';
const EXPEDITION_STATE_SAVE__POST=API_URL+'/master_ctrl/expedition-state-save';
const EXPEDITION_SAVE__POST=API_URL+'/master_ctrl/expedition-save';
const EXPEDITION_STATE_FIND_ALL__GET=API_URL+'/master_ctrl/expedition-state-find-all';
const CHAUFFEUR_FIND_ALL_PAGEABLE__GET=API_URL+'/master_ctrl/chauffeur-find-all?';
const VEHICULE_FIND_ALL_PAGEABLE__GET=API_URL+'/master_ctrl/vehicule-find-all?';
const EMPLOYER_FIND_ALL__GET=API_URL+'/master_ctrl/employer-find-all';
const COLIS_FIND_BY_PERIODE_AND_AGENCE__POST=API_URL+'/master_ctrl/colis-find-by-periode-and-agence';
const EXPEDITON_DELETE_BY_ID__DELETE=API_URL+'/master_ctrl/expedition/';
const EXPEDITON_SET_STATUS__GET=API_URL+'/master_ctrl/expedition-set-status/';
const EXPEDITON_REMOVE_COLIS__DELETE=API_URL+'/master_ctrl/colis-remove-in-expedition/';




/*=========================== simple user =================================================*/

const COLIS_FIND_BY_CODE__GET=API_URL+'/simple-user/colis-find-by-code?';
const QR_CODE_GET_BYTES = API_URL+ '/forAny/qr-code/';



/*============================END=============================================*/

export {
  USER_SAVE__POST,
  ADRESS_SAVE__POST,
  VILLE_FIND_ALL__GET,
  PAYS_FIND_ALL__GET,
  AUTHENTICATION,
  TARIFICATION_SAVE__POST,
  USER_FIND_ALL__GET,
  PAYS_SAVE__POST,
  VILLE_SAVE__POST,
  PAYS_FIND_ALL_REPOSITORY__GET,
  AGENCE_FIND_ALL__GET,
  GRILLE_TARRIFAIRE_FIND_ALL__GET,
  USER_ADD_ROLE__POST,
  USER_LOCK__POST,
  USER_ROMOVE_ROLE__POST,
  COLIS_SAVE__POST,
  COLIS_SET_STATUS__POST,
  COLIS_STATE_FIND_ALL__GET,
  USER_FIND_IS_ACTIVATED__GET,
  COLIS_FIND_ARCHIVED_IS_FALSE__GET,
  COLIS_STATE_SAVE__POST,
  EXPEDITION_STATE_SAVE__POST,
  EXPEDITION_STATE_FIND_ALL__GET,
  CHAUFFEUR_FIND_ALL_PAGEABLE__GET,
  CHAUFFEUR_SAVE__POST,
  VEHICULE_SAVE__POST,
  CLIENT_FIND_ALL__GET,
  VEHICULE_FIND_ALL_PAGEABLE__GET,
  EXPEDITION_SAVE__POST,
  EXPEDITION_FIND_ALL__PAGEABLE__GET,
  EXPEDITION_ARCHIVED_FIND_ALL__PAGEABLE__GET,
  EMPLOYER_SAVE__POST,
  EMPLOYER_FIND_ALL__PAGEABLE__GET,
  EMPLOYER_FIND_ALL__GET,
  DESTINATAIRE_UPDATE__POST,
  COLIS_SET_IS_ARCHIVED_SAVE__POST,
  COLIS_FIND_IS_ARCHIVED__PAGEABLE__GET,
  COLIS_FIND_BY_AGENCE_PAGEABLE__GET,
  COLIS_FIND_BY_CLIENT__PAGEABLE__GET,
  COLIS__FIND_ALL__PAGEABLE__GET,
  CLIENT_SAVE__POST,
  CLIENT_FIND_BY_NAME__LIST__GET,
  ACCOUNT_USER_FOR_EMPLOYER_FIND__GET,
  ACCOUNT_USER_FOR_SPECIFIQUE_ROLE__GET,
  COLIS_FIND_BY_CODE__GET,
  QR_CODE_GET_BYTES,
  COLIS_DELETE_BY_ID__DELETE,
  COLIS_FIND_BY_CLIENT_AND_STATE_IS_ONE__GET,
  INVOICE_FIND_ALL_PAGEABLE__GET,
  INVOICE_FIND_BY_CLIENT_ID__GET,
  INVOICE_SAVE__POST,
  INVOICE_DELETE__DELETE,
  ENTERPRISE__GET_INFO__GET,
  ENTERPRISE_SAVE__POST,
  COLIS_FIND_BY_PERIODE_AND_AGENCE__POST,
  AGENCE_FIND_BY_VILLE,
  EXPEDITON_DELETE_BY_ID__DELETE,
  COLIS_FIND_BY_EXPEDITION__GET,
  EXPEDITON_REMOVE_COLIS__DELETE,
  EXPEDITON_SET_STATUS__GET,
  TAGS_IN_EMAILS_FIND_ALL__GET,
  CLIENT_FIND_ALL_BY_COLIS__POST,
  CLIENT_FIND_BY_COLIS__GET,
  CLIENT_FIND_BY_EXPEDITION__GET,
  EMAIL_SEND_BY_COLIS_OR_EXPEDITION_ID__POST,
  MODEL_EMAIL_DELETE__DELETE,
  MODEL_EMAIL_FIND_ALL__GET,
}
