import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  apiBase = environment.apiBase;

  constructor(private http: HttpClient) { }  

  performPostRequest(endPoint: any, filterObject: any) {

    let auth_token = sessionStorage.getItem('access_token');

    if (auth_token) {
      console.log('auth_token', auth_token);
      console.log('filterObject', filterObject);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${auth_token}`
        'App-Token':  auth_token
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

  getCurrentPageData(allData:any, pageNumber:any, itemsPerPage:any) 
  {
    return new Promise(resolve => {

      if (allData.length > 0)
      {
        let start = (pageNumber - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let returnData = [];
        let totalItems = allData.length;

        if (end > totalItems)
        {
          end = totalItems;
        }

        for (let index = start; index < end; index++) 
        {
          returnData.push(allData[index]);
        }
        if (returnData.length == (end - start)) {
          resolve(returnData);
        }
      }
      else
      {
        resolve([]);
      }
      
    });
  }
  
  

}
