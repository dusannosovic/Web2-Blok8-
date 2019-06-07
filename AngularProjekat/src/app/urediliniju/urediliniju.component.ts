import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LinijaService } from '../linija.service';
import { Linija } from '../linija';
import { Polazak } from '../polazak';
import { MarkerInfo } from '../dodajstanicu/model/marker-info.model';
import { LinijaPolazak } from '../linijaPolazak';

@Component({
  selector: 'app-urediliniju',
  templateUrl: './urediliniju.component.html',
  styleUrls: ['./urediliniju.component.styl']
})
export class UredilinijuComponent implements OnInit {
  linije: Linija[];
  lin: Linija
  polascilinije: Polazak[];
  polasciVanLinije: Polazak[];
  staniceLinije: MarkerInfo[];
  staniceVanLinije: MarkerInfo[];
  linpol: LinijaPolazak;
  linijaForm = this.fb.group({
    linija:['']
  })
  constructor(private fb: FormBuilder, private linijaService: LinijaService) { }

  ngOnInit() {
    this.getLinijas()
  }
  getLinijas(){
      this.linijaService.getLinijas().subscribe(lin => this.linije = lin);
  }
  getAll(){
    this.lin = this.linije.find(x => x.OznakaLinije == this.linijaForm.get('linija').value);
    this.linijaService.getPolazakbyLin(this.linijaForm.get('linija').value).subscribe(pol1 => this.polasciVanLinije = pol1)
    this.linijaService.getPolazakLin(this.linijaForm.get('linija').value).subscribe(pol2 => this.polascilinije = pol2)
    this.linijaService.getStanicaMy(this.linijaForm.get('linija').value).subscribe(sta1 => this.staniceLinije = sta1)
    this.linijaService.getStanicaOther(this.linijaForm.get('linija').value).subscribe(sta2 => this.staniceVanLinije = sta2)
  }
  izbrisiPolazak(polazak: Polazak){
    this.polasciVanLinije.push(polazak)
    //console.log(this.polasci)
    this.polascilinije = this.polascilinije.filter(item => item !== polazak);
  }
  dodajPolazak(polazak: Polazak){
    this.polascilinije.push(polazak)
    //console.log(this.polasci)
    this.polasciVanLinije = this.polasciVanLinije.filter(item => item !== polazak);
  }
  izbrisiStanicu(stanica: MarkerInfo){
    this.staniceVanLinije.push(stanica)
    this.staniceLinije = this.staniceLinije.filter(item => item !== stanica);
  }
  dodajStanicu(stanica: MarkerInfo){
    this.staniceLinije.push(stanica);
    this.staniceVanLinije = this.staniceVanLinije.filter(item => item !== stanica);
  }
  updateLinija(){
    this.linpol = new LinijaPolazak();
    this.linpol.Linija = this.lin
    this.linpol.Polasci = this.polascilinije
    this.linpol.Stanice = this.staniceLinije
    //console.log(this.linpol)
    this.linijaService.updateLinija(this.linpol).subscribe();
    //this.linijaForm.controls['oznakaLinije'].setValue('');
    location.reload()
  }
}
