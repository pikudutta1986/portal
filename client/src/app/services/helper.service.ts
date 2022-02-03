import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  apiBase = 'http://localhost:8000/api/';
  // apiBase = environment.apiBase;

  constructor(private http: HttpClient) { }  

  performPostRequest(endPoint: any, filterObject: any) {

    let auth_token = sessionStorage.getItem('access_token');

    if (auth_token) {
      console.log('auth_token', auth_token);
      console.log('filterObject', filterObject);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })

      return this.http.post(
        this.apiBase + endPoint,
        filterObject,
        { headers: headers }
      );
    }
    else {
      alert("Access token expired!");
    }
  }

  performPostRequestWithoutToken(endPoint: any, filterObject: any) {
    
      console.log('filterObject', filterObject);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      })

      return this.http.post(
        this.apiBase + endPoint,
        filterObject,
        { headers: headers }
      );
  }

  sendChunk(endPoint: any, filterObject:any) {

    let auth_token = sessionStorage.getItem('access_token');   

    console.log(filterObject);

    if (auth_token) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });   
      
      return this.http.post(this.apiBase + endPoint,filterObject,{ headers: headers });
    }
    else {
      alert("Access token expired!");
    }
    
  }

  performGetRequest(endPoint:any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return this.http.get(
      this.apiBase + endPoint,
      { headers: headers }
    );

  }
    
 

}
