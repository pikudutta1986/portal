// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { HelperService} from '../../../services/helper.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	
	constructor(private router: Router,private authService: AuthService, private helperService: HelperService) { }
	
	ngOnInit() {
	}

	logout() {

		if(this.authService.isLoggedIn()) {
			
			let filterparam: any = sessionStorage.getItem('access_token');			
			
			let api = 'logout';

			this.helperService.performPostRequest(api,filterparam)?.subscribe((res) => {
				
				sessionStorage.removeItem('access_token');
				sessionStorage.removeItem('userData');				
				console.log(res);
				this.router.navigate(['/']);
			})

		}
	}
	
	
}