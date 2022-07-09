import {Agence} from "./agence";
import {Utilisateur} from "./utilisateur";

export class Client {
  id: string;
  codeClient: string;
  name: string;
  surname: string;
  telephone: string;
  email: string;
  sexe: string;
  dateNaissance: string;
  dateCreated: string;
  dateLastUpdate: string;
  agenceEnregistrement: Agence;
  acountClient: Utilisateur;

}
