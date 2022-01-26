import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBase = 'http://localhost:8000/api/server/login';
  handleError:any;

  constructor(private http: HttpClient) {   }
  // CALL THIS FUNCTION WITH USERNAME AND PASSWORD TO MAKE LOGIN.
  
  doLogin(filterObject:any) { 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.post<any>(this.apiBase,filterObject,{ headers: headers });
  }

  isLoggedIn() {
    if (sessionStorage.getItem('access_token')) {
      return true;
    }
    return false;
  }

    
}
