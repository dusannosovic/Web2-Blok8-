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
import { UredicenovnikComponent } from './uredicenovnik/uredicenovnik.component';
import { AuthGuard } from './Services/auth.guard';
import { AuthUserGuard } from './Services/authuser.guard';
import { VozilomapaComponent } from './vozilomapa/vozilomapa.component';
import { KontrolorvalidacijakarteComponent } from './kontrolorvalidacijakarte/kontrolorvalidacijakarte.component';
import { KontrolorvalidacijaprofilaComponent } from './kontrolorvalidacijaprofila/kontrolorvalidacijaprofila.component';

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
    component: EditprofileComponent,
    canActivate: [AuthUserGuard]
  },
  {
    path:'changpass',
    component: ChangpassComponent,
    canActivate: [AuthUserGuard]
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
    path:'vozilomapa',
    component: VozilomapaComponent,
  },
  {
    path: 'karteprikaz',
    component: KarteprikazComponent,
    canActivate: [AuthUserGuard]
  },
  {
    path: 'registracija',
    component: RegistracijaComponent
  },{
    path: 'kontrolorvalidacijakarte',
    component: KontrolorvalidacijakarteComponent 
  },
  {
    path: 'kontrolorvalidacijaprofila',
    component: KontrolorvalidacijaprofilaComponent
  },
  {
    path: 'logreg',
    component: LogregComponent,
    canActivate: [AuthGuard],
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
    },{
      path: 'uredicenovnik', component:UredicenovnikComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
