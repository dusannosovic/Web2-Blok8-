import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.styl']
})
export class EditprofileComponent implements OnInit {

  novaSlika: boolean = false;
  mySrc : string;

  editForm = this.fb.group({
    name: [Validators.required],
    surname: [Validators.required],
    address: [Validators.required],
    dateOfBirth: [Validators.required],
    type: [Validators.required],
    username: [[Validators.required, Validators.minLength(6)]],
    email: [[Validators.email]],
    imgUrl: [],
    
  });
  selectedFile: File = null;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  NovaSlika(event)
  {
    this.novaSlika = true;
  }
    get f() { return this.editForm.controls; }

  user:Korisnik = new Korisnik();
  editedUser: Korisnik
  oldUsername : string;
  date:string;

  constructor(private fb : FormBuilder, private userService : UserService, private authService : AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('userId')).subscribe(
      user => {
        this.user = user;
        this.editForm.setValue({
          name : this.user.Firstname,
          surname: this.user.Secondname,
          address: this.user.Address,
          dateOfBirth: this.user.DateOfBirth,
          type: this.user.UserType,
          username: this.user.Username,
          email: this.user.Email,
          imgUrl: this.user.ImgUrl
        });
        this.oldUsername = this.user.Username;
        this.date = this.user.DateOfBirth.toString().substring(0,10);
        if(this.user.ImgUrl != null)
        {
          this.userService.downloadImage(this.oldUsername).subscribe(
            data => {
              this.mySrc = 'data:image/jpeg;base64,' + data;
              }
          );
        }
      }
    );

    
  }

  onSubmit(){
    this.editedUser = new Korisnik();
    
      this.editedUser.Username = this.editForm.get('username').value;
      this.editedUser.Firstname = this.editForm.get('name').value;
      this.editedUser.Secondname = this.editForm.get('surname').value;
      this.editedUser.Email = this.editForm.get('email').value;
      this.editedUser.Address = this.editForm.get('address').value;
      this.editedUser.DateOfBirth = this.editForm.get('dateOfBirth').value;
      this.editedUser.UserType = this.editForm.get('type').value;
      this.editedUser.OldUsername = this.oldUsername;
      this.editedUser.ImgUrl = this.mySrc;
    

    if(this.authService.isLoggedIn()){
      this.userService.editProfile(this.editedUser).subscribe(
        (response) => {
          if(this.selectedFile != null && this.novaSlika)
          {
            let formData: FormData = new FormData();
            formData.append('image', this.selectedFile, this.selectedFile.name);
            this.userService.uploadImage(formData, this.oldUsername).subscribe(
              data =>  { }
            )
          }
          this.router.navigate(['/']);   
        },
        (error) => {}
      );
    }
  }
}
