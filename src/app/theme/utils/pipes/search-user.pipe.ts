import { Pipe, PipeTransform } from '@angular/core';
import {Utilisateur} from "../../../_model/utilisateur";

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(args: any[], value: string): unknown {
    if(!value) return args;
    return args.filter(u=> u.name?.indexOf(value) > -1 || u.surname?.indexOf(value) > -1)

  }

}
