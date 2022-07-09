import {Adresse} from "./adresse";

export class Tarification {
  id: string;
  poidsMin: number;
  poidsMax: number;
  longueMin: number;
  longuerMax: number;
  hauteurMax: number;
  hauteurMin: number;
  price: number;
  adrSource: Adresse;
  adrDestination: Adresse;
  adresseSourceName: string;
  adresseDestinationeName: string;

  constructor() {
    this.adrDestination = new Adresse();
    this.adrSource = new Adresse();
  }
}
