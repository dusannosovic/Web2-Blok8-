import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from'@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import{HttpModule} from '@angular/http'

//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedVoznjeComponent } from './red-voznje/red-voznje.component';
import { from } from 'rxjs';
import { CenovnikComponent } from './cenovnik/cenovnik.component';
import { MaplinesComponent } from './maplines/maplines.component';
import { LogregComponent } from './logreg/logreg.component';
import { DodajlinijuComponent } from './dodajliniju/dodajliniju.component';
import { UredilinijuComponent } from './urediliniju/urediliniju.component';
import { DodajstanicuComponent } from './dodajstanicu/dodajstanicu.component';
import { UredistanicuComponent } from './uredistanicu/uredistanicu.component';
import { DodajpolazakComponent } from './dodajpolazak/dodajpolazak.component';
import { KupikartuComponent } from './kupikartu/kupikartu.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { NavbarComponent } from './navbar/navbar.component';
import { KarteprikazComponent } from './karteprikaz/karteprikaz.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangpassComponent } from './changpass/changpass.component';
import{TokenInterceptor} from'./interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RedVoznjeComponent,
    CenovnikComponent,
    MaplinesComponent,
    LogregComponent,
    DodajlinijuComponent,
    UredilinijuComponent,
    DodajstanicuComponent,
    UredistanicuComponent,
    DodajpolazakComponent,
    KupikartuComponent,
    LoginComponent,
    RegistracijaComponent,
    NavbarComponent,
    KarteprikazComponent,
    EditprofileComponent,
    ChangpassComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
