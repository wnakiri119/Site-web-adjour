export class Ville {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  actived: boolean = true;
  paysId: string;
  paysName: string;

  constructor() {
    this.actived = true;
  }
}
