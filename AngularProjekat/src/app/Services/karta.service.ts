import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import { KartaModel } from '../models/kartaModel';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({providedIn: 'root'})
export class KartaService{
    private kartaUrl = 'http://localhost:52295/api/Karta'
    private ValidateKartaUrl = 'http://localhost:52295/api/Karta/Validate';
    constructor(private http: HttpClient){}

    putKarta(karta: KartaModel): Observable<KartaModel>{
        return this.http.post<KartaModel>(this.kartaUrl, karta, httpOptions)
        .pipe(
          //catchError(this.handleError('Post', ))
        );
    }
    getKarta(username: string): Observable<KartaModel[]>{
      return this.http.get<KartaModel[]>(`${this.kartaUrl}?username=${username}`)
      .pipe(
        //catchError(this.handleError('Post', ))
      );
  }
  validateKarta(id: any) : Observable<any>{
    return this.http.get<any>(`${this.ValidateKartaUrl}?ID=${id}`);
}


    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }
}