import { Component, OnInit } from '@angular/core';
import { KartaService } from '../Services/karta.service';

@Component({
  selector: 'app-kontrolorvalidacijakarte',
  templateUrl: './kontrolorvalidacijakarte.component.html',
  styleUrls: ['./kontrolorvalidacijakarte.component.styl']
})
export class KontrolorvalidacijakarteComponent implements OnInit {

  porukaStigla: boolean = false;
  poruka: [];
  constructor(private kartaService: KartaService) { }

  ngOnInit() {
  }

  validirajKartu(id: any){
    this.kartaService.validateKarta(id.ID).subscribe(
      (response) =>{
        this.poruka =  response.split(";");
        this.porukaStigla = true;
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
