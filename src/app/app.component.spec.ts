import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { HttpClientModule } from '@angular/common/http';
import {SocketService} from "./service/socket.service";
import { EnvServiceProvider } from './service/env.service.provider';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,HttpClientModule
      ],
      providers: [SocketService, EnvServiceProvider],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


 // it('should render title in a h1 tag', () => {
 //   const fixture = TestBed.createComponent(AppComponent);
 //   fixture.detectChanges();
 //   const compiled = fixture.debugElement.nativeElement;
 //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to realtime-chat-frontend!');
 // });
});
