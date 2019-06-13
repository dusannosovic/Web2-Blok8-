import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from './model/marker-info.model';
import { GeoLocation } from './model/geolocation';
import { Polyline } from './model/polyline';
import { FormBuilder } from '@angular/forms';
import {Validators} from '@angular/forms'
import { LinijaService } from '../linija.service';

@Component({
  selector: 'app-dodajstanicu',
  templateUrl: './dodajstanicu.component.html',
  styleUrls: ['./dodajstanicu.component.styl'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class DodajstanicuComponent implements OnInit {

  markerInfo: MarkerInfo;
  longitude = 19.842954;
  latitude= 45.242268;
  public polyline: Polyline;
  public zoom: number;
  url : any = {url:"assets/busicon.png", scaledSize: {width:50,height:50}};
  StationForm = this.fb.group({
    stationName:['',Validators.required],
    stationAddres:['',Validators.required]
  })
  

  ngOnInit() {
    /*this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
      {url:"assets/busicon.png", scaledSize:{width:50,height:50}},
      "" , "" , ""); */
    
      this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }

  constructor(private fb: FormBuilder, private ngZone: NgZone, private linijaService: LinijaService){
  }

  placeMarker($event){
    /*this.polyline.addLocation(new GeoLocation($event.coords.lat, $event.coords.lng))
    console.log(this.polyline) */
    this.markerInfo = new MarkerInfo(new GeoLocation($event.coords.lat, $event.coords.lng), "","");
  }
  onSubmit() {
    console.warn(this.StationForm.value);
  }
  addStanicu(){
    if(this.markerInfo != null){
      this.markerInfo.title = this.StationForm.get('stationName').value;
      this.markerInfo.label = this.StationForm.get('stationAddres').value;
      this.linijaService.addStanica(this.markerInfo).subscribe();
      location.reload()
    }
  }
}
