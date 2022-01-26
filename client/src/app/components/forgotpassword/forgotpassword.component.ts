/*
  FILENAME: forgotpassword.component.ts
  AUTHOR: ICI/AD
  SUMMARY: TBD
  PURPOSE: TBD
  IMPORTING FILES: auth.service.ts | account.service.ts | helper.service.ts
  SUBSCRIBING FILES: forgotpassword.routing.ts | forgotpassword.module.ts
  LAST COMMIT DATE: June 16, 2021
*/

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {Component, OnInit} from '@angular/core';

// IMPORTING THE ANGULAR FORM TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {Router} from "@angular/router";
import { HelperService } from '../../services/helper.service';


declare var $: any;
// COMPONENT DECLARATION. HERE WE CAN DEFINE HTML TEMPLATE, CSS FILES AND COMPONENT OPTIONS.
@Component
({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

// DECLARING THE ForgotpasswordComponent CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class ForgotpasswordComponent implements OnInit 
{

  // CLASS CONSTRUCTOR, THIS WILL BE FIRST FUNCTION TO BE EXECUTED WHEN THIS CLASS LOADS.
  // HERE WE WILL TELL ANGULAR TO INJECT A DEPENDENCY BY SPECIFYING A CONSTRUCTOR PARAMETER WITH THE DEPENDENCY TYPE.
  formData: FormGroup;

  constructor  (
    private formBuilder: FormBuilder,
    private router: Router,private helperService: HelperService,      
  )   {   }

  cookieValue:any;
  
  // THIS ANGULAR INBUILT FUNCTION WILL BE CALLED AFTER THIS COMPONENT IS INITIALIZED,
  // TO HANDLE ANY ADDITIONAL INITIALIZATION TASKS
  ngOnInit()  {

    this.formData = this.formBuilder.group ({      
			email: '',
		}); 

    $('.msg').css('color', '');
    $('.msg').text('Enter your email address that you used to register. We will send you an email with your username and a link to reset your password.');
    
  }

  resetPassword() {

    let api = 'resetPassword';

    let email = this.formData.value.email;
		let filterparam: any = { email: email };

    this.helperService.performPostRequestWithoutToken(api,filterparam).subscribe((res:any) => {

			if(res.status) {

        $('.msg').css('color', 'green');
        $('.msg').text('Please check your email !!'); 
				
			} else {
        
        $('.msg').css('color', 'red');
        $('.msg').text('Kindly provide correct email address');        

			} 
		});
  }

  
}
