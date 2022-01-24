

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import { Component, OnInit } from '@angular/core';

// IMPORTING ANGULAR FORMS TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { AuthService } from '../../auth/auth.service';


// COMPONENT DECLARATION. HERE WE CAN DEFINE HTML TEMPLATE, CSS FILES AND COMPONENT OPTIONS.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})



// DECLARING THE LoginComponent CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class LoginComponent implements OnInit {

	public formData: FormGroup;
  
	constructor(private formBuilder: FormBuilder,private authService: AuthService,) {}

  ngOnInit() {
	this.formData = this.formBuilder.group ({      
		username: '',
		password: ''    
    });
  }

  onSubmit() {

	  let username = this.formData.value.username;
	  let passwords = this.formData.value.password;

	  let filterparam: any = {email: username, password: passwords}; 

	//   this.authService.doLogin(username, password);
	//   console.log(username, password);

	  this.authService.doLogin(filterparam).subscribe(
		  res => console.log(res),
		  err => console.log(err),
	  );

  }
}
