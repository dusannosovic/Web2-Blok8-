import { Response, Http, Headers } from '@angular/http'
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {NotifyService } from './notify.service';

@Injectable({ providedIn: 'root'})
export class AuthService{

    constructor(private notifyService : NotifyService) { }

    logIn(response: any) : void {
        const jwt =  response.access_token;


        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let role = decodedJwtData.role
        let userId =  decodedJwtData.unique_name;

        localStorage.setItem('token', jwt)
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
    }

    logOut(): void {       
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
    }

    isLoggedIn(): boolean {
        if(!localStorage.getItem('jwt'))
            return false;
        else
            return true;
    }

    isAdmin(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let role = localStorage.getItem('role');
        if (role=="Admin") {
            return true;
        } else {
            return false;
        }
    }

    isKontrolor(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let token = localStorage.getItem('jwt');
        let role = JSON.parse(token).role;

        if (role=="Kontrolor") {
            return true;
        } else {
            return false;
        }
    }

    isKorisnik(): boolean {
        if(!this.isLoggedIn()) {
            return false;
        }

        let token = localStorage.getItem('jwt');
        let role = JSON.parse(token).role;

        if (role=="Korisnik") {
            return true;
        } else {
            return false;
        }
    }
    
}

export class AuthData {
    
    token: string;
    role: string;
    id: string;

    constructor(token:string, role: string, id: string) {
        this.token = token;
        this.role = role;
        this.id = id;
     }
}