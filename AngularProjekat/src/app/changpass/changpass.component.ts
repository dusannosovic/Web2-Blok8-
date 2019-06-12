import { Component, OnInit } from '@angular/core';
import { ChangePasswordModel } from '../models/changePasswordModel';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../Services/passwordvalidator.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-changpass',
  templateUrl: './changpass.component.html',
  styleUrls: ['./changpass.component.styl']
})
export class ChangpassComponent implements OnInit {

  changePassForm = this.fb.group({
    oldPassword: ['', [Validators.required,
    Validators.minLength(6),
    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
    password: ['', [Validators.required,
    Validators.minLength(6),
    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
  confirmPassword: ['',
    Validators.required],
  }, { validators: ConfirmPasswordValidator })

  get f() { return this.changePassForm.controls; }

  constructor(private fb : FormBuilder, private userService : UserService,
    private authService : AuthService, private router : Router) { }

  ngOnInit() {
  }

  passModel : ChangePasswordModel;

  onSubmit(){
      if(this.authService.isLoggedIn)
      {
        this.passModel = new ChangePasswordModel(this.changePassForm.get('oldPassword').value,
        this.changePassForm.get('password').value, this.changePassForm.get('confirmPassword').value);
        this.userService.changePassword(this.passModel).subscribe(
          (response) => {
            this.router.navigate(['/']); //uspesno izmenjena sifra
          },
          (error) => {} //greska
        );
      }
  }
}
