import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserComponent } from './dialog-user.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import {User} from "../model/user";
import {DataService} from "../service/data.service";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../material/material.module";
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';


import { EnvServiceProvider } from '../service/env.service.provider';
import { compileBaseDefFromMetadata, CompiledStylesheet } from '@angular/compiler';

describe('DialogUserComponent', () => {
  let component: DialogUserComponent;
  let fixture: ComponentFixture<DialogUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserComponent ]
    ,
    imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialModule,
      ReactiveFormsModule,HttpClientModule,
      MatDialogModule
    
    ],
    providers: [
      {
        provide:MatDialogRef,
        useValue: {close: (dialogResult: any) => {}}
      }
    ]
   
 })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should render title in a h2 tag', () => {
    
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Welcome');
  });


  it('Form should be invalid', async(() => {
    fixture = TestBed.createComponent(DialogUserComponent);
    fixture.detectChanges();
    component.userform.controls['username'].setValue('');
    component.userform.controls['password'].setValue('');
    
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('error-email-required').textContent).toContain('User Name Required');

    expect(component.userform.valid).toBeFalsy();
  }));







});
