import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from '../dodajstanicu/model/marker-info.model';
import {GeoLocation} from '../dodajstanicu/model/geolocation'
import { LokacijaService } from '../Services/lokacija.service';
import {LinijaService} from'../linija.service'
import { Router } from '@angular/router';
import { Linija } from '../linija';

@Component({
  selector: 'app-vozilomapa',
  templateUrl: './vozilomapa.component.html',
  styleUrls: ['./vozilomapa.component.styl'],
  styles: ['agm-map {height: 600px; width: 1125px;}'] 
})
export class VozilomapaComponent implements OnInit {

  isConnected: Boolean;
  locations: string[];
  selectedLinija: string;
  markeri: MarkerInfo[] = [];
  autobus: MarkerInfo;
  linije: Linija[] = [];
  bus: string[];
  url : any = {url:"assets/bus.png", scaledSize: {width:50,height:50}};
  private routeSub:any;

  constructor(private lokacijaService: LokacijaService, private ngZone: NgZone,private linijaService: LinijaService,private router: Router) {
    this.isConnected = false;
    this.locations = [];
   }

  ngOnInit() {

    this.checkConnection();
    this.subscribeForLocations();
    this.lokacijaService.registerForLocation();
    this.linijaService.getLinijas().subscribe(
      linija => {
        this.linije = linija;
      });
  }

  private checkConnection(){
    this.lokacijaService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {
          //  this.lokacijaService.Start();
          this.lokacijaService.Start();
        }
    });
  }

  private subscribeForLocations (){
     this.lokacijaService.locationReceived.subscribe(l => this.onNotification(l));
  }

  public onNotification(notification: string) {

    this.ngZone.run(() => { 
      console.log(notification);
      let busevi = notification.split(";");
      busevi.forEach(element => {
        let temp = element.split("_");
        if(temp[0] == this.selectedLinija)
          this.bus = temp;
      });
      if (this.bus != undefined){
        this.autobus = new MarkerInfo(new GeoLocation(+this.bus[1],+this.bus[2]), "", "");
      }
   });  
 }

 prikaziBus(linija: any){
  this.selectedLinija = linija;
  this.markeri = [];
  this.linijaService.getStanicaMy(linija).subscribe(
    (data) =>{
        data.forEach(element => {
          let location = new GeoLocation(element.location.latitude, element.location.longitude);
          this.markeri.push(new MarkerInfo(location, element.title, element.label))
        });
    },
    (error) =>{
      console.log(error);
    }
  );
 }

}
