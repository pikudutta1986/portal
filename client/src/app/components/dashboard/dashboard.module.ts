/*
  FILENAME: dashboard.module.ts
  AUTHOR: ICI/AD
  SUMMARY: TBD
  PURPOSE: TBD
  IMPORTING FILES: dashboard.routing.ts | dashboard.component.ts
  SUBSCRIBING FILES: TBD
  LAST COMMIT DATE: June 17, 2021
*/

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.// TBD
import {NgModule} from '@angular/core';

// IMPORTING THE ANGULAR COMMON DATA.
import {CommonModule, DatePipe } from '@angular/common';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {dashboardRoutingModule} from './dashboard.routing';

//IMPORTING HTTP MODULE
import {HttpClientModule} from '@angular/common/http';

// IMPORTING THE ANGULAR FORM TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


//IMPORTING DASHBOARD COMPONENT
import { DashboradComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';



// IMPORTING ALL PAGE COMPONENT 
//import {ManageCoursesComponent} from './managecourses/managecourses.component';

// AN ANGULAR DECORATOR THAT IDENTIFIES THE MODULE'S OWN COMPONENTS, DIRECTIVES, AND PIPES, SO THAT EXTERNAL COMPONENTS CAN USE THEM.
@NgModule
({
  imports:
  [
    CommonModule, 
    dashboardRoutingModule,    
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations:
  [
    DashboradComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    DashboradComponent,    
  ],
  entryComponents: [],
  providers: [DatePipe]
})

// DECLARING THE dashboardModule CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class dashboardModule 
{
  // CLASS CONSTRUCTOR, THIS WILL BE FIRST FUNCTION TO BE EXECUTED WHEN THIS CLASS LOADS.
  // HERE WE WILL TELL ANGULAR TO INJECT A DEPENDENCY BY SPECIFYING A CONSTRUCTOR PARAMETER WITH THE DEPENDENCY TYPE.
	constructor()
	{
		console.log('dashboradModule loaded');
	}
}
