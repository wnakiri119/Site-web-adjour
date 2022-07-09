import {Utilisateur} from "./utilisateur";
import {Agence} from "./agence";

export class Employer {
  id: string;
  telephone: string;
  email: string;
  matricule: string;
  dateCreated: string;
  dateLastUpdate: string;
  userAccount: Utilisateur;
  agence: Agence;

}
