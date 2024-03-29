// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { dashboardModule } from './components/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './components/vendor/sign-up/sign-up.component';


@NgModule({
  declarations: [
  AppComponent,
  SignUpComponent
  ],
  imports: [
  BrowserModule,
  CommonModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  dashboardModule,
  BrowserAnimationsModule
  ],
  providers: [
  CookieService,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }