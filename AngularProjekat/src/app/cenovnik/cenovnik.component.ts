import { Component, OnInit } from '@angular/core';
import { Cena } from '../cena';
import {LinijaService} from'../linija.service'
import { Korisnik } from '../models/korisnik';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.styl']
})
export class CenovnikComponent implements OnInit {
  stavke: Cena[];
  role : string;
  type : string;
  constructor(private linijaService: LinijaService, private userService: UserService) { }

  ngOnInit() {
    this.getStavka()
    this.role = localStorage.getItem('role');
    this.type = localStorage.getItem('userType');
  }
  getStavka(){
    this.linijaService.getStavka()
    .subscribe(stav => this.stavke = stav);
  }
}
