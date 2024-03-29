/*
  FILENAME: dashboard.routing.ts
  AUTHOR: ICI/AD
  SUMMARY: TBD
  PURPOSE: TBD
  IMPORTING FILES: dashboard.component.ts
  SUBSCRIBING FILES: TBD
  LAST COMMIT DATE: June 17, 2021
*/

// IMPORTING THE ANGULAR MODULES FOR PERFORMING BASIC ANGULAR FRAMEWORK OPERATIONS.
import {NgModule} from '@angular/core';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import {Routes, RouterModule} from '@angular/router';

//IMPORTING DASHBOARD COMPONENT
import {DashboradComponent} from './dashboard.component';

// IMPORTING ALL PAGE COMPONENT 
import {UploadComponent} from './content/upload/upload.component';
import { DownloadComponent } from './content/download/download.component';
import { UploadlistComponent } from './content/uploadlist/uploadlist.component';
import { ReferalComponent } from './content/referal/referal.component';
import { ReferListComponent } from './content/refer-list/refer-list.component';

// DEFINING THE ROUTINGS
const routes: Routes = 
[
	// IF THE PATH IS BLANK THEN LOAD DashboardComponent COMPONENT
	{
    path: '', 
    component: DashboradComponent, 
    children: 
    [
      {path: 'upload', component: UploadComponent},
      {path: 'uploadlist', component: UploadlistComponent},
      {path: 'download', component: DownloadComponent},
      {path: 'refer', component: ReferalComponent},
      {path: 'referList', component: ReferListComponent},
    ]
  }
];

// AN ANGULAR DECORATOR THAT IDENTIFIES THE MODULE'S OWN COMPONENTS, DIRECTIVES, AND PIPES, SO THAT EXTERNAL
// COMPONENTS CAN USE THEM.
@NgModule
({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

// DECLARING THE LoginRoutingModule CLASS WITH EXPORT SO THAT WE CAN IMPORT THIS SERVICE INTO ANY OTHER COMPONENT OR SERVICE.
export class dashboardRoutingModule {}
