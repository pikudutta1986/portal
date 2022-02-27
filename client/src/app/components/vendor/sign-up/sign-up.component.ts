

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import { Component, OnInit } from '@angular/core';

// IMPORTING ANGULAR FORMS TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../../auth/auth.service';
import { HelperService } from '../../../services/helper.service';
import { CookieService } from 'ngx-cookie-service';

declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formData: FormGroup;
	regFormData: FormGroup;

	cookieValue: any = null;
	all_regions:any;

  token:any;
  userId:any;

  tokenStatus:boolean = false;
  regionStatus:boolean = false;

	constructor(
		private formBuilder: FormBuilder, private authService: AuthService,
		private router: Router, private helperService: HelperService, 
    private cookieService: CookieService,private route: ActivatedRoute
	) { }

  ngOnInit() {
		
		this.regFormData = this.formBuilder.group({
			firstname:  [ '', Validators.required],
			lastname:  [ '', Validators.required],
			email:  [ '', Validators.required],
			phone:  [ '', Validators.required],
			regions:  [ '', Validators.required],
			userType: 'B',
			password:  [ '', Validators.required]
		});

    $('.msg').css('color', '');
		$('.msg').text('Sign up to start your session');   

	}
  
  ngAfterViewInit() {

    this.token = this.route.snapshot.queryParamMap.get("token");
    this.userId = this.route.snapshot.queryParamMap.get("referralId");
    this.default();

  }

  default() {
    this.helperService.showSiteLoader();
    this.regions();
    this.checkTokenForRegister();
  }

  loader() {
    if(this.tokenStatus  && this.regionStatus) {
      this.helperService.hideSiteLoader();
      this.tokenStatus = false;
      this.regionStatus = false;
    }
  }

	checkTokenForRegister() {

		let filterparam: any = {
			userId: this.userId, token: this.token,
		};

		let api = 'checkTokenForRegister';

		this.helperService.performPostRequestWithoutToken(api, filterparam).subscribe((res: any) => {

			if (res.status) {


			} else {
				$('.msg').text(res.message);
				$("#regForm").hide();
				$('.msg').css('color', 'red');
			}

			this.tokenStatus = true;
			this.loader();
			// console.log(res);

		});

	}

	register() {

		$('.msg').css('color', '');

		this.helperService.showSiteLoader();

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
			password: passwords, token: this.token, refererralId: this.userId
		};

		let api = 'referalRegister';

		this.helperService.performPostRequestWithoutToken(api, filterparam).subscribe((res: any) => {

			if (res.status) {
				console.log('status', res.status);
				this.regFormData.reset();
				$('.msg').text(res.message);
				$('.msg').css('color', 'green');
				$("#regForm").hide();
			} else {
				$('.msg').text(res.message);
				$('.msg').css('color', 'red');
			}

			this.helperService.hideSiteLoader();			

		});

	}


	regions() {

		let api = 'regions';
		this.helperService.performGetRequest(api).subscribe((res: any) => {

			if (res.status) {
				this.regionStatus = true;
				this.all_regions = res.regions;
				this.regFormData.controls['regions'].setValue(this.all_regions[0].id);
				this.loader();

			}
		})

	}

}
