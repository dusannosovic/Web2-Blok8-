import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import { Marker } from '@agm/core/services/google-maps-types';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({providedIn: 'root'})
export class StanicaService{
    private stanicaUrl = 'http://localhost:52295/api/Stanica'



    constructor(private http: HttpClient){}

    /** GET heroes from the server */
    deleteStanica(id: number): void{
        this.http.delete(`${this.stanicaUrl}?id=${id}`,httpOptions).subscribe();
    }
}