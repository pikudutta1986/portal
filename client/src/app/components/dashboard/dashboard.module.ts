
// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.// TBD
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
// IMPORTING THE ANGULAR COMMON DATA.
import {DatePipe } from '@angular/common';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {dashboardRoutingModule} from './dashboard.routing';

//IMPORTING HTTP MODULE
import {HttpClientModule} from '@angular/common/http';

// IMPORTING THE ANGULAR FORM TO CONVERT AN HTML FORM TO A REACTIVE FORM.
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


//IMPORTING DASHBOARD COMPONENT
import { DashboradComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';



// IMPORTING ALL PAGE COMPONENT 
import { UploadComponent } from './content/upload/upload.component';
import { DownloadComponent } from './content/download/download.component';
import { UploadlistComponent } from './content/uploadlist/uploadlist.component';
import { SurveyOneComponent } from './content/upload/survey-one/survey-one.component';
import { SurveyTwoComponent } from './content/upload/survey-two/survey-two.component';
import { ReferalComponent } from './content/referal/referal.component';
import { ReferListComponent } from './content/refer-list/refer-list.component';


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
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
  ],
  declarations:
  [
  DashboradComponent,
  NavbarComponent,
  SidebarComponent,
  UploadComponent,
  DownloadComponent,
  UploadlistComponent,
  SurveyOneComponent,
  SurveyTwoComponent,
  ReferalComponent,
  ReferListComponent
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
