import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Polazak } from '../polazak';
import { Linija } from '../linija';
import { LinijaService } from '../linija.service';

@Component({
  selector: 'app-dodajpolazak',
  templateUrl: './dodajpolazak.component.html',
  styleUrls: ['./dodajpolazak.component.styl']
})
export class DodajpolazakComponent implements OnInit {

  polazak: Polazak
  radniDan=['RadniDan','Subota','Nedelja']
  polazakForm = this.fb.group({
    sati:['', Validators.required],
    minuti:['', Validators.required],
    dan:[this.radniDan[0],Validators.required]
  })
  constructor(private fb: FormBuilder, private linijaService:LinijaService) { }

  ngOnInit() {
  }
  dodajPolazak(){
    this.polazak = new Polazak();
    this.polazak.VremePolaska = this.polazakForm.get('sati').value + '_' + this.polazakForm.get('minuti').value
    console.log(this.polazak.VremePolaska);
    switch (this.polazakForm.get('dan').value) {
      case 'RadniDan':
          this.polazak.Dan = 0
          break;
      case 'Subota':
        this.polazak.Dan = 1
          break;
      case 'Nedelja':
        this.polazak.Dan = 2
        break;
    }
    this.linijaService.addPolazak(this.polazak).subscribe();
    location.reload();
  }
}
