import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KartaService } from '../Services/karta.service';
import { LinijaService } from '../linija.service';
import { KartaModel } from '../models/kartaModel';
@Component({
  selector: 'app-kupikartu',
  templateUrl: './kupikartu.component.html',
  styleUrls: ['./kupikartu.component.styl']
})
export class KupikartuComponent implements OnInit {
  tipKarte: string;
  tipPopusta: string;
  karta: KartaModel;
  cena: number;
  role:any;
  kartaForm = this.fb.group({
    karta: [''],

  })
  constructor(private fb: FormBuilder, private route: ActivatedRoute,  private kartaService: KartaService, private router: Router) { }

  ngOnInit() {
    this.getInfo();
  }
  getInfo(){
    this.tipKarte = this.route.snapshot.paramMap.get('tip');
    this.tipPopusta = this.route.snapshot.paramMap.get('popust');
    this.cena = +this.route.snapshot.paramMap.get('cena');
    this.role = localStorage.role;
  }
  kupiKartu(){
    this.karta = new KartaModel()
    this.karta.TipKarte = this.tipKarte;
    this.karta.VrstaPutnika = this.tipPopusta;
    this.karta.Cena  = this.cena;
    this.karta.Email = this.kartaForm.get('karta').value;
    this.kartaService.putKarta(this.karta).subscribe();
    this.router.navigate(['cenovnik'])
  }
  kupiKartuLog(){
    this.karta = new KartaModel()
    this.karta.TipKarte = this.tipKarte;
    this.karta.VrstaPutnika = this.tipPopusta;
    this.karta.Cena  = this.cena;
    this.karta.Username = localStorage.getItem('userId')
    this.kartaService.putKarta(this.karta).subscribe();
    this.router.navigate(['cenovnik'])
  }
}
