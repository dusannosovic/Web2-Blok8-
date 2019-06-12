import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../Services/notify.service';
import { AuthService } from '../Services/auth.service';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})
export class NavbarComponent implements OnInit {
  IsLoggedIn: boolean;
  IsAdmin: boolean;
  constructor(private notifyService: NotifyService, private authService: AuthService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loadData()
  }
  LogOut() : void{
    if(this.authService.isLoggedIn())
    {
      this.authService.logOut()

          this.loadData();
          this.router.navigate(['/'])
    }
  }
  loadData() : void{
    this.notifyService.sessionEvent.subscribe((loggedIn : boolean) => {
      this.IsLoggedIn = this.authService.isLoggedIn();
      this.IsAdmin = this.authService.isAdmin();
  });

  this.IsLoggedIn = this.authService.isLoggedIn();
  this.IsAdmin = this.authService.isAdmin();
  }

}
