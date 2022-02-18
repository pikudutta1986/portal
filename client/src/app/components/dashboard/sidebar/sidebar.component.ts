import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { HelperService} from '../../../services/helper.service';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public currentRoute: string = '';
  userTypes:any;
  st:boolean = true;

  constructor(private router: Router, private authService: AuthService, private helperService: HelperService) { }

  ngOnInit(): void 
  {
    //sessionStorage.getItem('access_token');
    this.userTypes = sessionStorage.getItem('userType');
    console.log(this.userTypes);

    this.setCurrentActive(this.router.url);

    this.router.events.subscribe ((routeinfo: any) =>
    {
      if (routeinfo instanceof NavigationEnd)
      {
        let url = routeinfo.url; // STORING THE URL INTO LOCAL VARIABLE.
        this.setCurrentActive(url);
      }
    });
  }

  setCurrentActive (url: any)
  {
    let urlArray = url.split ('/'); // SPLITTING THE URL ON THE BASIS OF SLASH.
    this.currentRoute = urlArray[urlArray.length - 1]; // GETTING THE VALUE AT INDEX 1.
    console.log('currentRoute', this.currentRoute);
  }

  logout() {

    if(this.authService.isLoggedIn()) {

      this.helperService.showSiteLoader();
      
      let filterparam: any = sessionStorage.getItem('access_token');      
      
      let api = 'logout';

      this.helperService.performPostRequest(api,filterparam)?.subscribe((res) => {
        
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('userData');        
        console.log(res);
        this.helperService.hideSiteLoader();
        this.router.navigate(['/']);
      })

    }
  }

}
