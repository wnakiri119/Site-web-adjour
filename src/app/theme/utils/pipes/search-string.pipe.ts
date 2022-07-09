import { Pipe, PipeTransform } from '@angular/core';
import {Utilisateur} from "../../../_model/utilisateur";

@Pipe({
  name: 'searchByName'
})
export class SearchByName implements PipeTransform {

  transform(args: any[], value: string): unknown {
    if(!value) return args;
    return args.filter(u=> u.name?.indexOf(value) > -1)

  }

}
