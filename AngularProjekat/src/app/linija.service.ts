import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import {Linija} from './linija'
import { Polazak } from './polazak';
import { Cena } from './cena';
import { LinijaPolazak } from './linijaPolazak';
import { MarkerInfo } from './dodajstanicu/model/marker-info.model';
import { Marker } from '@agm/core/services/google-maps-types';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({providedIn: 'root'})
export class LinijaService{
    private linijasUrl = 'http://localhost:52295/api/Linija'
    private linijasUrlTip = 'http://localhost:52295/api/lins'
    private polasciUrl='http://localhost:52295/api/Polasci'
    private Stavka = 'http://localhost:52295/api/Stavka'
    private polazakUrl = 'http://localhost:52295/api/Polasci'
    private stanicaUrl = 'http://localhost:52295/api/Stanica'
    private polazakmyUrl='http://localhost:52295/api/polazakmy'
    private stanicamyUrl ='http://localhost:52295/api/getstanicamy'
    private stanicaotherUrl ='http://localhost:52295/api/getstanicaother'
    private updateLinijaUrl = 'http://localhost:52295/api/updatelinija'
    private updateStanicaUrl = 'http://localhost:52295/api/updatestanica'


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
    getPolazakLin(lin: string): Observable<Polazak[]>{
        return this.http.get<Polazak[]>(`${this.polazakmyUrl}?linija=${lin}`).pipe(
            //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
            );
    }
    getStanicaOther(lin: string): Observable<MarkerInfo[]>{
        return this.http.get<MarkerInfo[]>(`${this.stanicaotherUrl}?linija=${lin}`).pipe(
            //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
            );
    }
    getStanicaMy(lin: string): Observable<MarkerInfo[]>{
        return this.http.get<MarkerInfo[]>(`${this.stanicamyUrl}?linija=${lin}`).pipe(
            //   catchError(this.handleError<Linija[]>('getLinijas',[]))  
            );
    }
    getStanica(): Observable<MarkerInfo[]>{
        return this.http.get<MarkerInfo[]>(this.stanicaUrl).pipe(catchError(this.handleError<MarkerInfo[]>('getStanica')));
    }
    addLinija(linija: LinijaPolazak): Observable<LinijaPolazak> {
        console.log(linija);
        return this.http.post<LinijaPolazak>(this.linijasUrl, linija, httpOptions).pipe(
            catchError(this.handleError<LinijaPolazak>('addLinija'))
          );
      }
      addPolazak(polazak: Polazak): Observable<Polazak> {
        console.log(polazak);
        return this.http.post<Polazak>(this.polazakUrl, polazak, httpOptions).pipe(
            catchError(this.handleError<Polazak>('addPolazak'))
          );
      }
      addStanica(stanica: MarkerInfo): Observable<MarkerInfo> {
        console.log(stanica);
        return this.http.post<MarkerInfo>(this.stanicaUrl, stanica, httpOptions).pipe(
            catchError(this.handleError<MarkerInfo>('addStanica'))
          );
      }
      updateLinija(linija: LinijaPolazak): Observable<LinijaPolazak>{
        //console.log(linija);
        return this.http.post<LinijaPolazak>(this.updateLinijaUrl, linija, httpOptions).pipe(
            catchError(this.handleError<LinijaPolazak>('UpdateLinija'))
          );
      }
      updateStanica(stanica: MarkerInfo): Observable<MarkerInfo>{
        return this.http.post<MarkerInfo>(this.updateStanicaUrl, stanica, httpOptions).pipe(
            catchError(this.handleError<MarkerInfo>('UpdateLinija'))
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