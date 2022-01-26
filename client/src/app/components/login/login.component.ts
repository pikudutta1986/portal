

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import { Component, OnInit } from '@angular/core';

// IMPORTING ANGULAR FORMS TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { AuthService } from '../../auth/auth.service';
import { HelperService } from '../../services/helper.service';

declare var $: any;

// COMPONENT DECLARATION. HERE WE CAN DEFINE HTML TEMPLATE, CSS FILES AND COMPONENT OPTIONS.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})



// DECLARING THE LoginComponent CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class LoginComponent implements OnInit {

	formData: FormGroup;
	regFormData: FormGroup;
	
  
	constructor(
		private formBuilder: FormBuilder,private authService: AuthService,
		private router: Router,private helperService: HelperService,
	) {}

	ngOnInit() {
		this.formData = this.formBuilder.group ({      
			username: '',
			password: ''    
		}); 

		this.regFormData = this.formBuilder.group ({      
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			password: ''
		});

		if(this.getAccessToken()) {

			this.router.navigate(['/dashboard']);

		} 

		$("#regForm").hide();
	}

	registerView() {
		$("#regForm").show();
		$("#loginForm").hide();
	}

	loginView() {

		$("#regForm").hide();
		$("#loginForm").show();

	}

	login() {

		let username = this.formData.value.username;
		let passwords = this.formData.value.password;

		let filterparam: any = { email: username, password: passwords };

		this.authService.doLogin(filterparam).subscribe((result) => {

			if(result.status) {
				console.log(result);
				this.setAccessToken(result);
				this.router.navigate(['/dashboard']);				

			} else {
				alert('wrong credential');
				console.log('false');
			}

		});

	}

	register() {

		let firstname = this.regFormData.value.firstname;
		let lastname = this.regFormData.value.lastname;
		let email = this.regFormData.value.email;		
		let phone = this.regFormData.value.phone;
		let passwords = this.regFormData.value.password;

		let filterparam: any = { 
			firstname: firstname, lastname: lastname,
			email: email, phone: phone,
			password: passwords,
		};

		let api = 'register';

		this.helperService.performPostRequestWithoutToken(api,filterparam).subscribe((res:any) => {

			if(res.status) {
				console.log('status',res.status);
				this.regFormData.reset();
				this.formData.reset();
				this.loginView();
			} else {
				alert('Kindly check your email-id or Phone');
			} 
			// console.log(res);

		});

	}

	setAccessToken(result:any) {
		return new Promise(resolve => {
		  sessionStorage.setItem('userData', result.user);
		  sessionStorage.setItem('access_token', result.token);
		  resolve(true);
		});
	}
	
	getAccessToken() {
		return sessionStorage.getItem('access_token');
	}

	
}
