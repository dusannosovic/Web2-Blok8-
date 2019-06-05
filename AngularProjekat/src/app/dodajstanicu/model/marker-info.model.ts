import { GeoLocation } from "./geolocation";

export class MarkerInfo {
    iconUrl: any;
    title: string;
    label: string;
    location: GeoLocation;
    link: string;

    constructor(location: GeoLocation, icon: any, title:string, label:string, link: string){
        this.iconUrl = icon;
        this.title = title;
        this.label = label;
        this.location = location;
        this.link = link;
    }
} 