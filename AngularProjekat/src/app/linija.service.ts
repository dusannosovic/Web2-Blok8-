import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import {Linija} from './linija'
import { Polazak } from './polazak';
import { Cena } from './cena';
import { LinijaPolazak } from './linijaPolazak';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({providedIn: 'root'})
export class LinijaService{
    private linijasUrl = 'http://localhost:52295/api/Linija'
    private linijasUrlTip = 'http://localhost:52295/api/lins'
    private polasciUrl='http://localhost:52295/api/Polasci'
    private Stavka = 'http://localhost:52295/api/Stavka'
    private liniSet = 'http://localhost:52295/api/lini'

    constructor(private http: HttpClient){}

    /** GET heroes from the server */
    getLinijas(): Observable<Linija[]>{
        return this.http.get<Linija[]>(this.linijasUrl).pipe(
        //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
        );
    }
    getLinijaTip(tip:string): Observable<Linija[]>{
        return this.http.get<Linija[]>(`${this.linijasUrlTip}?linija=${tip}`)
        .pipe();
    }
    getPolazak(lin:string,dan:string): Observable<Polazak[]>{
        return this.http.get<Polazak[]>(`${this.polasciUrl}?linija=${lin}&dan=${dan}`).pipe(
        //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
        );
        }
    getStavka(): Observable<Cena[]>{
        return this.http.get<Cena[]>(this.Stavka).pipe(
            //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
            );
    }
    getPolazakbyLin(lin: string): Observable<Polazak[]>{
        return this.http.get<Polazak[]>(`${this.polasciUrl}?linija=${lin}`).pipe(
            //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
            );
    }
    addLinija(linija: LinijaPolazak): Observable<LinijaPolazak> {
        console.log(linija);
        return this.http.post<LinijaPolazak>(this.linijasUrl, linija, httpOptions).pipe(
            catchError(this.handleError<LinijaPolazak>('addLinija'))
          );
      }
    // private handleError<T> (operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {
    //       return of(result as T);
    //     };
    //   }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }
}