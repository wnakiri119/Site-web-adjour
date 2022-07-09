import {AppRole} from "./AppRole";

export class Utilisateur {
  id: string;
  name: string;
  surname: string;
  sexe: string;
  username: string;
  password: string;
  actived: boolean;
  loocked: boolean;
  dateCreated: string;
  dateLastUpdate: string;
  appRoles: AppRole[];

}
