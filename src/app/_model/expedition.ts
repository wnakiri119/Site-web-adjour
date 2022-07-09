import {Colis} from "./colis";
import {Utilisateur} from "./utilisateur";
import {Adresse} from "./adresse";
import {StatusExpedition} from "./status-expedition";
import {Chauffeur} from "./chauffeur";
import {Vehicule} from "./vehicule";
import {Agence} from "./agence";

export class Expedition {
  id: string;
  dateDepart: string;
  dateArrive: string;
  heureDepart: string;
  heureArrive: string;
  dateLastUpdate: string;
  dateCreated: string;
  colis: Colis[];
  utilisateur: Utilisateur;
  depart: Agence;
  arrive: Agence;
  expeditionStatus: StatusExpedition;
  chauffeur: Chauffeur;
  vehicule: Vehicule;
  adressSourceId: string;
  adressDestinationId: string;
  expeditionStateId: string;
  chauffeurId: string;
  vehiculeId: string;
  colisId: string[];
  nombreColis: number;
  heureDepartString: string;

}
