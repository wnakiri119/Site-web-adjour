import {Colis} from "./colis";
import {Employer} from "./employer";

export class Invoice{
  id: string;
  code: string;
  colis: Colis[];
  amount: number;
  weigth: number;
  employer: Employer;
  dateCreated: string;
  dateLastUpdate: string;

  public constructor() {
    this.colis = [];
  }
}
