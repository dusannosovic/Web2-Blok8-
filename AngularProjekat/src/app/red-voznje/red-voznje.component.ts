import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Linija} from '../linija'
import {LinijaService} from'../linija.service'
import {Polazak} from'../polazak'
import { from } from 'rxjs';


@Component({
  selector: 'app-red-voznje',
  templateUrl: './red-voznje.component.html',
  styleUrls: ['./red-voznje.component.styl']
})
export class RedVoznjeComponent implements OnInit {
  linije: Linija[];
  polasci: Polazak[];
  polazak: Polazak[];
  tipLinije = ['Gradska','Prigradska'];
  radniDan=['RadniDan', 'Subota','Nedelja'];
  tipLinijeForm = this.fb.group({
    tipLin:[this.tipLinije[0], Validators.required],
    dan:[this.radniDan[0],Validators.required]
  });
  constructor(private fb: FormBuilder, private linijaService: LinijaService) { }

  ngOnInit() {
    //this.getLinijas();
    this.getLinijaTip();
  }
  getLinijas(): void {
    this.linijaService.getLinijas()
    .subscribe(linijas => this.linije = linijas);
    this.polasci =[]
  }
  getLinijaTip(){
    this.linijaService.getLinijaTip(this.tipLinijeForm.get('tipLin').value)
    .subscribe(linijas => this.linije = linijas)
    this.polasci = []
  }
  getPolazak(lin: string){
    this.linijaService.getPolazak(lin,this.tipLinijeForm.get('dan').value).subscribe(polazaks => this.polasci = polazaks)
  }
  getPolazaksdan(){
    this.polasci = []
  }



  onSubmit() {
    console.warn(this.tipLinijeForm.value);
  }
}
