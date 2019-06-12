import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import { KartaModel } from '../models/kartaModel';
import { TipKarte } from '../models/tipkarte';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({providedIn: 'root'})
export class TipKartaService{
    private kartaUrl = 'http://localhost:52295/api/TipKarte'
    constructor(private http: HttpClient){}

    getTip(): Observable<TipKarte[]>{
        return this.http.get<TipKarte[]>(this.kartaUrl)
        .pipe(
          //catchError(this.handleError('Post', ))
        );
    }
    postTip(karte: TipKarte[]):Observable<TipKarte[]>{
        return this.http.post<TipKarte[]>(this.kartaUrl, karte, httpOptions).pipe(catchError(this.handleError<any>('PostTip')));
    }


    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }
}