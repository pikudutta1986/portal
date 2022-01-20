/*
  FILENAME: resetpassword.routing.ts
  AUTHOR: ICI
  SUMMARY: TBD
  PURPOSE: TBD
  IMPORTING FILES: resetpassword.component.ts
  SUBSCRIBING FILES: resetpassword.module.ts
  LAST COMMIT DATE: June 16, 2021
*/

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {NgModule} from '@angular/core';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {Routes, RouterModule} from '@angular/router';

// IMPORTING THE ANGULAR MODULES FOR RESET PASSWORD COMPONENT
import {ResetpasswordComponent} from './resetpassword.component';

// DEFINING THE ROUTINGS
const routes: Routes = 
[
	// IF THE PATH IS BLANK THEN LOAD ResetpasswordComponent COMPONENT
	{
		path: '',
		component: ResetpasswordComponent
	}
];

// AN ANGULAR DECORATOR THAT IDENTIFIES THE MODULE'S OWN COMPONENTS, DIRECTIVES, AND PIPES. SO THAT EXTERNAL COMPONENTS CAN USE THEM.
@NgModule
({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

// DECLARING THE ResetpasswordRoutingModule CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class ResetpasswordRoutingModule {}
