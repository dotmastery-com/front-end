import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { HttpClientModule } from '@angular/common/http';
import {SocketService} from "./service/socket.service";

@NgModule({
  declarations: [
    AppComponent,
    DialogUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,HttpClientModule
  ],
  entryComponents: [DialogUserComponent],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
