import {Utilisateur} from "./utilisateur";
import {Agence} from "./agence";
import {Destinataire} from "./destinataire";
import {Client} from "./client";
import {Employer} from "./employer";
import {StatusColis} from "./_model_helper/status-colis";


export class Colis {
  id: string;
  code: string;
  name: string;
  poids: number;
  largeur: number;
  hauteur: number;
  dateCreated: string;
  valeur: string;
  nature: string;
  colisStatus: StatusColis;
  archiver: boolean;
  dateLastUpdate: string;
  amountExpedition: number;
  description: string;

  enregistrerPar: Employer;
  depart: Agence;
  arrive: Agence;
  destinataire: Destinataire;

  client: Client;
  linkQrCode: string;
  quantity: number;
}
