import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {User} from '../model/user';
import { EnvService } from 'src/app/service/env.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private env: EnvService
    ) { 
      console.log(this.env.api.data);
    }


  private endpoint = this.env.api.data;  
  private authUserUrl = this.endpoint + '/auth';
  private registerUserUrl = this.endpoint+"/register";

  authUser(user: User): Observable<User> {

    return this.http.post(this.authUserUrl, user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
      .pipe(catchError(this.handleError))

  }

  registerUser(user: User): Observable<User> {

    return this.http.post(this.registerUserUrl, user, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
      .pipe(catchError(this.handleError))

  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {

      console.log(`Error:  ${error.status} : ${error.error}`);
      if (error.status == 403) {
        errorMessage = `User already exists`;

      } else if (error.status == 401) {
        errorMessage = `Invalid username or password`;
      }
       else {
         errorMessage = `Unexpected error.`;
      }

    }
    return throwError(errorMessage);
  }
}
