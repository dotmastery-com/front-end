import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {User} from "../model/user";



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private authUserUrl = 'http://myuserservice-my-jenkins.1d35.starter-us-east-1.openshiftapps.com/auth';
  private registerUserUrl = 'http://myuserservice-my-jenkins.1d35.starter-us-east-1.openshiftapps.com/register';


  constructor(private http: HttpClient) {
  }


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
