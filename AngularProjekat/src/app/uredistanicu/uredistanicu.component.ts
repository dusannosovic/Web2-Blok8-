import { Component, OnInit } from '@angular/core';
import { MarkerInfo } from '../dodajstanicu/model/marker-info.model';
import { FormBuilder } from '@angular/forms';
import { LinijaService } from '../linija.service';
import { Polyline } from '../dodajstanicu/model/polyline';
import { StanicaService } from '../Services/stanica.service';

@Component({
  selector: 'app-uredistanicu',
  templateUrl: './uredistanicu.component.html',
  styleUrls: ['./uredistanicu.component.styl'],
  styles: ['agm-map {height: 500px; width: 700px;}']
})
export class UredistanicuComponent implements OnInit {
  stanice: MarkerInfo[];
  markerInfo: MarkerInfo;
  public polyline: Polyline;
  url : any = {url:"assets/busicon.png", scaledSize: {width:50,height:50}};
  stanicaForm = this.fb.group({
    stanica:['']
  })
  longitude = 19.842954;
  latitude= 45.242268;
  constructor(private fb: FormBuilder, private linijaService: LinijaService, private stanicaService: StanicaService) { }
  stanicaadrnazForm = this.fb.group({
    imeStanice:[''],
    adresaStanice:['']
  })

  ngOnInit() {
    this.getStanicu()
    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
  }
  placeMarker($event){
    /*this.polyline.addLocation(new GeoLocation($event.coords.lat, $event.coords.lng))
    console.log(this.polyline) */
    //this.markerInfo = new MarkerInfo(new GeoLocation($event.coords.lat, $event.coords.lng), "","");
    this.markerInfo.location.latitude = $event.coords.lat;
    this.markerInfo.location.longitude = $event.coords.lng;
  }
  getStanicu(){
    this.linijaService.getStanica().subscribe(stan=> this.stanice = stan)
  }
  setStanicu(){
    this.markerInfo = this.stanice.find(x => x.id == this.stanicaForm.get('stanica').value);
    this.stanicaadrnazForm.controls['imeStanice'].setValue(this.markerInfo.title);
    this.stanicaadrnazForm.controls['adresaStanice'].setValue(this.markerInfo.label);
  }
  updateStanica(){
    this.markerInfo.title = this.stanicaadrnazForm.get('imeStanice').value;
    this.markerInfo.label = this.stanicaadrnazForm.get('adresaStanice').value;
    this.linijaService.updateStanica(this.markerInfo).subscribe();
    location.reload()
  }
  deleteStanica(){
      this.stanicaService.deleteStanica(this.markerInfo.id);
      location.reload();
  }
}
