import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../Services/passwordvalidator.service';
import { RegisterService } from '../Services/register.service';
import { Korisnik } from '../models/korisnik';
import { UserService } from '../Services/user.service';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.styl']
})
export class RegistracijaComponent implements OnInit {

  user: Korisnik;
  selFile: File = null;
  selFileSrc: String;
    registerForm = this.fb.group({
      name: ['',Validators.required],
      surname: ['',Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      type: ['RegularniKorisnik', Validators.required],
      username: ['',[Validators.required,Validators.minLength(6)]],
      email: ['',[Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])/)]],
      confirmPassword: ['',Validators.required],
      imgUrl: [''],
      
    },{validators: ConfirmPasswordValidator}); 
  get f() { return this.registerForm.controls; }

  constructor(private fb: FormBuilder,private registerService: RegisterService, private userService: UserService, private router: Router,private authService: AuthService) {} 
  ngOnInit() {
    
  }
  onFileSelected(event) {
    this.selFile = <File>event.target.files[0];
  }
  onSubmit(){
    this.user = new Korisnik(
      this.registerForm.get('username').value,
      this.registerForm.get('name').value,
      this.registerForm.get('surname').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.registerForm.get('confirmPassword').value,
      this.registerForm.get('address').value,
      this.registerForm.get('dateOfBirth').value,
      this.registerForm.get('type').value,
      false
    );

    if(!this.authService.isLoggedIn()){
      this.registerService.register(this.user).subscribe(
        (response) => {
          if(this.selFile != null)
          {
            let formData: FormData = new FormData();
            formData.append('image', this.selFile, this.selFile.name);
            this.userService.uploadImage(formData, this.registerForm.get('username').value).subscribe(
              data => {
                this.userService.downloadImage(this.registerForm.get('username').value).subscribe(
                  data => {
                    this.selFileSrc = 'data:image/jpeg;base64,' + data;
                    });
              }
            )
          }
          this.router.navigate(['/login']);   
        },
        (error) => {}
      );
    }
  }

}
