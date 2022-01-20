/*
  FILENAME: resetpassword.module.ts
  AUTHOR: ICI/AD
  SUMMARY: TBD
  PURPOSE: TBD
  IMPORTING FILES: resetpassword.routing.ts | resetpassword.component.ts
  SUBSCRIBING FILES: TBD
  LAST COMMIT DATE: June 16, 2021
*/

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {NgModule} from '@angular/core';

// IMPORTING THE ANGULAR COMMON DATA.
import {CommonModule} from '@angular/common';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {ResetpasswordRoutingModule} from './resetpassword.routing';

// IMPORTING THE ANGULAR RESET PASSWORD COMPONENT.
import {ResetpasswordComponent} from './resetpassword.component';

// IMPORTING THE ANGULAR FORM TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



// AN ANGULAR DECORATOR THAT IDENTIFIES THE MODULE'S OWN COMPONENTS, DIRECTIVES, AND PIPES. SO THAT EXTERNAL COMPONENTS CAN USE THEM.
@NgModule
({
  imports:
  [
    CommonModule, 
    ResetpasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations:
  [
    ResetpasswordComponent
  ],
  exports: [ResetpasswordComponent],
  entryComponents: [],
})

// DECLARING THE ResetpasswordModule CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class ResetpasswordModule 
{
  // CLASS CONSTRUCTOR, THIS WILL BE FIRST FUNCTION TO BE EXECUTED WHEN THIS CLASS LOADS.
  // HERE WE WILL TELL ANGULAR TO INJECT A DEPENDENCY BY SPECIFYING A CONSTRUCTOR PARAMETER WITH THE DEPENDENCY TYPE.
	constructor()
	{
		console.log('loginModule Module loaded');
	}
}
