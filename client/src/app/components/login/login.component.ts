

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import { Component, OnInit } from '@angular/core';

// IMPORTING ANGULAR FORMS TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";


// COMPONENT DECLARATION. HERE WE CAN DEFINE HTML TEMPLATE, CSS FILES AND COMPONENT OPTIONS.
@Component
	({
		selector: 'app-login',
		templateUrl: './login.component.html',
		styleUrls: ['./login.component.css']
	})

// DECLARING THE LoginComponent CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class LoginComponent implements OnInit {
	
	constructor
		(
			
	) {

	}

	ngOnInit() 
	  {
		}


	
	
}
