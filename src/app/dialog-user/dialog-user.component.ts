import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import {User} from '../model/user';
import {DataService} from '../service/data.service';



//import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  errormessage: string;

  userform = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required]
  });
  http: any;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogUserComponent>, private data: DataService){
  }

  ngOnInit() {
  }

  //public signinWithGoogle () {
  //  let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
 
 //   this.socialAuthService.signIn(socialPlatformProvider)
 //   .then((userData) => {
       //on success
       //this will return user data from google. What you need is a user token which you will send it to the server
 //      this.sendToRestApiMethod(userData.idToken);
 //   });
 //}

  public onSubmit(user: User): void {

    this.data.authUser(user).subscribe(data => {
      this.dialogRef.close({
        username: user.username
      });
    }, error => {
     this.errormessage = error;
    });


  }

  public register(user: User) : void {
    this.data.registerUser(user).subscribe(data => {

      this.dialogRef.close({
        username: user.username
      });
    }, error => {
      this.errormessage = error;
    });
  }


  get username() { return this.userform.get('username'); }

  get password() { return this.userform.get('password'); }

  onKey(event) {
    this.errormessage="";
  }

 // sendToRestApiMethod(token: string) : void {
 //   this.http.post("url to google login in your rest api",
 //      {
 //         token: token
 //      }
 //   }).subscribe(
 //      onSuccess => {
          //login was successful
          //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
 //      }, onFail => {
          //login was unsuccessful
          //show an error message
 //      }
 //   );
 



}
