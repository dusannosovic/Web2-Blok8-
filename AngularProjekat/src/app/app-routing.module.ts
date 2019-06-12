import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedVoznjeComponent } from './red-voznje/red-voznje.component';
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
import { KarteprikazComponent } from './karteprikaz/karteprikaz.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ChangpassComponent } from './changpass/changpass.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/red-voznje',
    pathMatch: 'full'
  },
  {
    path: 'red-voznje',
    component: RedVoznjeComponent
  },
  {
    path: 'cenovnik',
    component: CenovnikComponent
  },
  {
    path: 'maplines',
    component: MaplinesComponent
  },
  {
    path:'editprofile',
    component: EditprofileComponent
  },
  {
    path:'changpass',
    component: ChangpassComponent
  },
  {
    path: 'kupiKartu/:tip/:popust/:cena',
    component: KupikartuComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'karteprikaz',
    component: KarteprikazComponent
  },
  {
    path: 'registracija',
    component: RegistracijaComponent
  },
  {
    path: 'logreg',
    component: LogregComponent,
    children:[{
        path:'logreg',
        redirectTo: '/dodajliniju',
        pathMatch: 'full'
    },
    {
        path: 'dodajliniju', component: DodajlinijuComponent
    },
    {
      path: 'urediliniju', component: UredilinijuComponent
    },
    {
      path: 'dodajstanicu', component: DodajstanicuComponent
    },{
      path: 'uredistanicu', component:UredistanicuComponent
    },{
      path: 'dodajpolazak', component:DodajpolazakComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
