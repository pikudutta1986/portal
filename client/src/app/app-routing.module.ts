import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './components/vendor/sign-up/sign-up.component';

// TBD
const routes: Routes =
[
  {
  
    path: '',
    pathMatch: 'full',
    loadChildren:() => import ('./components/login/login.module').then(m => m.loginModule)
  },
  {
    // LOADS FORGOT PASSWORD MODULE
    path: 'forgotpassword',
    loadChildren:() => import ('./components/forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule)
  },
  {
    // LOADS RESET PASSWORD MODULE
    path: 'resetpassword',
    loadChildren:() => import ('./components/resetpassword/resetpassword.module').then(m => m.ResetpasswordModule)
  },
  {
    // LOADS DASHBOARD MODULE
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren:() => import ('./components/dashboard/dashboard.module').then(m => m.dashboardModule)
  },
  {
    // LOADS DASHBOARD MODULE
    path: 'vendor/signUp',
    component: SignUpComponent
    // canActivate: [AuthGuard],
    // loadChildren:() => import ('./components/vendor/dashboard.module').then(m => m.dashboardModule)
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}

