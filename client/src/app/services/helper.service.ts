import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient, @Inject('API_URL') public apiBase: string) { }

  performGetRequest(endPoint) {

    let auth_token = sessionStorage.getItem('access_token');

    if (auth_token) {
      console.log('auth_token', auth_token);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })

      return this.http.get(this.apiBase + endPoint, { headers: headers });
    }
    else {
      alert("Access token expired!");
    }

  }

  performPostRequest(endPoint, filterObject) {

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

  getCurrentPageData(allData, pageNumber, itemsPerPage)   {
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
