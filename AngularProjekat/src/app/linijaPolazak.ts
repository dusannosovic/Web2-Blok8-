import { Linija } from './linija';
import { Polazak } from './polazak';
import { MarkerInfo } from './dodajstanicu/model/marker-info.model';

export class LinijaPolazak{
    Linija : Linija
    Polasci: Polazak[]
    Stanice: MarkerInfo[]
}