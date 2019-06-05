import { Component, OnInit } from '@angular/core';
import { Cena } from '../cena';
import {LinijaService} from'../linija.service'

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.styl']
})
export class CenovnikComponent implements OnInit {
  stavke: Cena[];
  constructor(private linijaService: LinijaService) { }

  ngOnInit() {
    this.getStavka()
  }
  getStavka(){
    this.linijaService.getStavka()
    .subscribe(stav => this.stavke = stav);
  }
}
