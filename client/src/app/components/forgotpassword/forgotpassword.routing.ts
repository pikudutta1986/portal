/*
  FILENAME: forgotpassword.routing.ts
  AUTHOR: ICI/AD
  SUMMARY: TBD
  PURPOSE: TBD
  IMPORTING FILES: forgotpassword.component.ts
  SUBSCRIBING FILES: forgotpassword.module.ts
  LAST COMMIT DATE: June 16, 2021
*/

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {NgModule} from '@angular/core';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {Routes, RouterModule} from '@angular/router';

// IMPORTING THE ANGULAR FORGET PASSWORD COMPONENT
import {ForgotpasswordComponent} from './forgotpassword.component';

// DEFINING THE ROUTINGS
const routes: Routes = 
[
	// IF THE PATH IS BLANK THEN LOAD ForgotpasswordComponent COMPONENT
	{
		path: '',
		component: ForgotpasswordComponent
	}
];

// AN ANGULAR DECORATOR THAT IDENTIFIES THE MODULE'S OWN COMPONENTS, DIRECTIVES, AND PIPES. SO THAT EXTERNAL COMPONENTS CAN USE THEM.
@NgModule
({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

// DECLARING THE ForgotpasswordRoutingModule CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class ForgotpasswordRoutingModule {}
