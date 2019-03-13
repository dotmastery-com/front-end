import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import {User} from "../model/user";
import {DataService} from "../service/data.service";

@Component({
  selector: 'tcc-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {


  errormessage: string;

  userform = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required]
  });

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogUserComponent>, private data: DataService) {
  }

  ngOnInit() {
  }

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



}
