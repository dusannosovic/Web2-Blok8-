import { Component, OnInit } from '@angular/core';
import { KartaService } from '../Services/karta.service';
import { KartaModel } from '../models/kartaModel';

@Component({
  selector: 'app-karteprikaz',
  templateUrl: './karteprikaz.component.html',
  styleUrls: ['./karteprikaz.component.styl']
})
export class KarteprikazComponent implements OnInit {
  karte: KartaModel[]
  constructor(private kartaService: KartaService) { }

  ngOnInit() {
    this.getKarta();
  }
  getKarta(){
    this.kartaService.getKarta(localStorage.getItem('userId')).subscribe(k=> this.karte = k)
  }

}
