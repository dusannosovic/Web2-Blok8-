import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LinijaService } from '../linija.service';
import { Linija } from '../linija';
import { Polazak } from '../polazak';
import { LinijaPolazak } from '../linijaPolazak';

@Component({
  selector: 'app-dodajliniju',
  templateUrl: './dodajliniju.component.html',
  styleUrls: ['./dodajliniju.component.styl']
})
export class DodajlinijuComponent implements OnInit {
  tipLinije = ['Gradska', 'Prigradska']
  lin: Linija;
  polasci: Polazak[] = []
  linpol: LinijaPolazak;
  linijaForm = this.fb.group({
    oznakaLinije: [''],
    tipLin: [this.tipLinije[0],Validators.required]
  })
  constructor(private fb: FormBuilder, private linijaService: LinijaService) { }
  polazak: Polazak[]
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
    //console.log(this.linpol)
    this.linijaService.addLinija(this.linpol).subscribe();
    //this.linijaForm.controls['oznakaLinije'].setValue('');
    location.reload()
  }
  ngOnInit() {
    this.getPolazak()
  }
  getPolazak(){
    this.linijaService.getPolazakbyLin('').subscribe(pol=> this.polazak = pol);
  }
  deletePolazak(polazak: Polazak){
      this.polasci.push(polazak)
      console.log(this.polasci)
      this.polazak = this.polazak.filter(item => item !== polazak);
  }

}
