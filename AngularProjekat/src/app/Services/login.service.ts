import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NotifyService } from './notify.service';
import { AuthService } from './auth.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'  })
  };
  class LOG{
    username : string;
    password : string;
}

@Injectable({ providedIn: 'root' })
export class LoginService{
    log:LOG = new LOG;
    private apiAddress: string = `http://localhost:52295/oauth/token`;

    constructor(private httpClient : HttpClient,private notificationService: NotifyService,
                private authService: AuthService,private router: Router) { }

    logIn(email: string, password: string)
    {    
        const query = `username=${email}&password=${password}&grant_type=password`;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
          };
        this.log.password = password;
        this.log.username = email;
        this.httpClient.post<any>(this.apiAddress, query, httpOptions).subscribe(
           (data) =>{
                    
            let jwt = data.access_token;

            let jwtData = jwt.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)

            let role = decodedJwtData.role
            let userId = decodedJwtData.unique_name

            console.log('jwtData: ' + jwtData)
            console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
            console.log('decodedJwtData: ' + decodedJwtData)
            console.log('Role ' + role)

            localStorage.setItem('jwt', jwt)
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);

            this.authService.logIn(data);
            this.notificationService.sessionEvent.emit(true);
            this.router.navigate(['karteprikaz']);
            },
            (error) => {
                this.notificationService.notifyEvent.emit('An error ocurred while trying to log in. The server is probably down.');
                console.log(error);
                if(error.status !== 0){
                    let errorBody = JSON.parse(error._body);
                    this.notificationService.notifyEvent.emit(errorBody.error_description);
                }        
              }
        );
    }

    isLoggedIn(): boolean{
        if(localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }

}