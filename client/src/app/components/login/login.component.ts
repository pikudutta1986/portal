

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import { Component, OnInit } from '@angular/core';

// IMPORTING ANGULAR FORMS TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { AuthService } from '../../auth/auth.service';
import { HelperService } from '../../services/helper.service';
import { CookieService } from 'ngx-cookie-service';

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

	cookieValue: any = null;
	all_regions:any;

	constructor(
		private formBuilder: FormBuilder, private authService: AuthService,
		private router: Router, private helperService: HelperService, private cookieService: CookieService
	) { }

	ngOnInit() {
		this.formData = this.formBuilder.group({
			username: '',
			password: '',
			rememberme: false,
		});

		this.regions();

		this.regFormData = this.formBuilder.group({
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			regions: '',
			userType: 'uploader',
			password: ''
		});

		if (this.getAccessToken()) {

			this.router.navigate(['/dashboard']);

		}
		$(".msg").text("Sign in to start your session");

		$("#regForm").hide();


	}

	ngAfterViewInit() {

		console.log(this.cookieService.get('username'));

		if (this.cookieService.get('username') != '') {
			console.log('yes');
			this.formData = this.formBuilder.group({
				username: this.cookieService.get('username'),
				password: this.cookieService.get('password'),
				rememberme: true,
			});
		}


	}

	registerView() {

		$('.msg').css('color', '');
		$('.msg').text('Sign up to start your session');
		$("#regForm").show();
		$("#loginForm").hide();
	}

	loginView() {

		$('.msg').css('color', '');
		$('.msg').text('Sign in to start your session');

		$("#regForm").hide();
		$("#loginForm").show();

	}

	login() {

		this.helperService.showSiteLoader();

		$('.msg').css('color', '');

		// let a = this.formData.controls['username'].setValue('tushart');

		let username = this.formData.value.username;
		let passwords = this.formData.value.password;
		let rememberme = this.formData.value.rememberme;

		if (rememberme) {

			this.cookieService.set('username', username);
			this.cookieService.set('password', passwords);
			// this.cookieValue = { 'email': this.cookieService.get('username'), password: this.cookieService.get('password')};

		} else {
			this.cookieService.deleteAll();
		}

		let filterparam: any = { email: username, password: passwords };

		this.authService.doLogin(filterparam).subscribe((result) => {

			if (result.status) {

				this.setAccessToken(result);
				this.helperService.hideSiteLoader();
				this.router.navigate(['/dashboard']);

			} else {

				$('.msg').text('Wrong credentials');
				$('.msg').css('color', 'red');
			}

		});

	}

	register() {

		$('.msg').css('color', '');

		let firstname = this.regFormData.value.firstname;
		let lastname = this.regFormData.value.lastname;
		let email = this.regFormData.value.email;
		let phone = this.regFormData.value.phone;
		let regions = this.regFormData.value.regions;
		let userType = this.regFormData.value.userType;
		let passwords = this.regFormData.value.password;

		let filterparam: any = {
			firstname: firstname, lastname: lastname,
			email: email, phone: phone, regions: regions, userType: userType,
			password: passwords,
		};

		let api = 'register';

		console.log(filterparam);

		this.helperService.performPostRequestWithoutToken(api, filterparam).subscribe((res: any) => {

			if (res.status) {
				console.log('status', res.status);
				this.regFormData.reset();
				this.formData.reset();
				this.loginView();
			} else {

				$('.msg').text('Kindly check your email-id or Phone');
				$('.msg').css('color', 'red');
			}
			// console.log(res);

		});

	}

	setAccessToken(result: any) {
		return new Promise(resolve => {
			sessionStorage.setItem('userData', result.id);
			sessionStorage.setItem('userType', result.type);
			sessionStorage.setItem('access_token', result.token);
			resolve(true);
		});
	}

	getAccessToken() {
		return sessionStorage.getItem('access_token');
	}

	regions() {

		let api = 'regions';
		this.helperService.performGetRequest(api).subscribe((res:any) => {
			console.log(res);
			if(res.status) {
				this.all_regions = res.regions;
				this.regFormData.controls['regions'].setValue(this.all_regions[0].id);

			}
		})

	}

	
}
