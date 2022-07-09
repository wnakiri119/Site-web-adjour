import {Utilisateur} from "./utilisateur";
import {Ville} from "./ville";

export class Pays {
  id: string;
  name: string;
  code: string;
  longitude: number;
  latitude: number;
  villes: Ville[];
  afficheVille: boolean=false;
}
