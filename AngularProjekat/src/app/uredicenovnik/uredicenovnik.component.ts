import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { TipKartaService } from '../Services/tipk.service';
import { TipKarte } from '../models/tipkarte';
import { setCheckNoChangesMode } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-uredicenovnik',
  templateUrl: './uredicenovnik.component.html',
  styleUrls: ['./uredicenovnik.component.styl']
})
export class UredicenovnikComponent implements OnInit {

  tipKartas: TipKarte[]
  constructor(private fb:FormBuilder, private karta: TipKartaService) { }
  cenovnikForm = this.fb.group({
    vremenskaForm:[''],
    dnevnaForm:[''],
    mesecnaForm:[''],
    godisnjaForm:['']
  })
  ngOnInit() {
    this.getCen()
  }
  getCen(){
    this.karta.getTip().subscribe(
      (data) => { 
        this.cenovnikForm.controls['vremenskaForm'].setValue(data.find(c => c.Tip === 'Vremenska').Cena)
        this.cenovnikForm.controls['dnevnaForm'].setValue(data.find(c=> c.Tip === 'Dnevna').Cena)
        this.cenovnikForm.controls['mesecnaForm'].setValue(data.find(c => c.Tip === 'Mesecna').Cena)
        this.cenovnikForm.controls['godisnjaForm'].setValue(data.find(c => c.Tip === 'Godisnja').Cena)
        this.tipKartas = data
      }
    );
  }
  setCen(){
  this.tipKartas.find(c => c.Tip === 'Vremenska').Cena = this.cenovnikForm.get('vremenskaForm').value;
  this.tipKartas.find(c => c.Tip === 'Dnevna').Cena = this.cenovnikForm.get('dnevnaForm').value;
  this.tipKartas.find(c => c.Tip === 'Mesecna').Cena = this.cenovnikForm.get('mesecnaForm').value;
  this.tipKartas.find(c => c.Tip === 'Godisnja').Cena = this.cenovnikForm.get('godisnjaForm').value;
  this.karta.postTip(this.tipKartas).subscribe();
  location.reload();
  }

}
