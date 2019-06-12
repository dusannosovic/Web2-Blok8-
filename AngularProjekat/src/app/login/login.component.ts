import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { NotifyService } from '../Services/notify.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  username: string;
  password: string;

  loginForm = this.fb.group({
    username : [this.username, Validators.required],
    // email : [this.email, [Validators.required, Validators.email]],
    password : [this.password, Validators.required]  
  });

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router, private notifyService: NotifyService, private loginService: LoginService){ }

  get f() {return this.loginForm.controls}
  ngOnInit() {
    if(this.authService.isLoggedIn()) {
      this.notifyService.sessionEvent.emit(true);
      this.router.navigate(['karteprikaz']);
      location.reload();
    }
  }
  onLogin(): void{
    this.submitted = true;  
    this.username = this.loginForm.get('username').value;
    this.password = this.loginForm.get('password').value;
    this.loginService.logIn(this.username,this.password);
  }

}
