import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LinijaService } from '../linija.service';
import { Linija } from '../linija';
import { Polazak } from '../polazak';
import { LinijaPolazak } from '../linijaPolazak';
import { MarkerInfo } from '../dodajstanicu/model/marker-info.model';
import { Marker } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-dodajliniju',
  templateUrl: './dodajliniju.component.html',
  styleUrls: ['./dodajliniju.component.styl']
})
export class DodajlinijuComponent implements OnInit {
  tipLinije = ['Gradska', 'Prigradska']
  lin: Linija;
  polasci: Polazak[] = []
  stanice: MarkerInfo[] = []
  linpol: LinijaPolazak;
  polazak: Polazak[]
  stanicalist: MarkerInfo[]
  linijaForm = this.fb.group({
    oznakaLinije: ['', Validators.required],
    tipLin: [this.tipLinije[0],Validators.required]
  });
  constructor(private fb: FormBuilder, private linijaService: LinijaService) { }
  dodajLiniju(){
    this.lin = new Linija();
    this.linpol = new LinijaPolazak();
    this.linpol.Polasci
    this.lin.OznakaLinije = this.linijaForm.get('oznakaLinije').value;

    if(this.linijaForm.get('tipLin').value == 'Gradska'){
      this.lin.TipLinije = 0;
    }else if(this.linijaForm.get('tipLin').value == 'Prigradska'){
      this.lin.TipLinije = 1;
    }
    this.linpol.Linija = this.lin
    this.linpol.Polasci = this.polasci
    this.linpol.Stanice = this.stanice
    //console.log(this.linpol)
    this.linijaService.addLinija(this.linpol).subscribe();
    //this.linijaForm.controls['oznakaLinije'].setValue('');
    location.reload()
  }
  ngOnInit() {
    this.getPolazak()
    this.getStanica()
  }
  getPolazak(){
    this.linijaService.getPolazakbyLin('').subscribe(pol=> this.polazak = pol);
    console.log(this.polazak)
  }
  getStanica(){
    this.linijaService.getStanica().subscribe(st=> this.stanicalist = st);
    console.log(this.stanicalist);
  }
  deletePolazak(polazak: Polazak){
      this.polasci.push(polazak)
      console.log(this.polasci)
      this.polazak = this.polazak.filter(item => item !== polazak);
  }
  deleteStanica(stanica: MarkerInfo){
    this.stanice.push(stanica)
    console.log(this.stanice)
    this.stanicalist = this.stanicalist.filter(item => item!== stanica)
  }

}
