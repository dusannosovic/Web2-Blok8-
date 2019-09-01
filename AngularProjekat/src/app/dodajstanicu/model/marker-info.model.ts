import { GeoLocation } from "./geolocation";

export class MarkerInfo {
    id: number;
    title: string;
    label: string;
    location: GeoLocation;
    Verzija: Number;

    constructor(location: GeoLocation, title:string, label:string){
        this.title = title;
        this.label = label;
        this.location = location;
    }
} 