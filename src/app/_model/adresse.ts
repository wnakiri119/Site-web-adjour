import {Pays} from "./pays";
import {Ville} from "./ville";

export class Adresse {
  id: string
  type: number;
  pays: Pays;
  ville: Ville;
  paysName: string;
  villeName:  string;

}
