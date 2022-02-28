import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login-singup/userlogin/userlogin.component';
import { UserSignupComponent } from './user-login-singup/usersignup/usersignup.component';
import { UserLogoutComponent } from './user-login-singup/userlogout/userlogout.component';
import { HomeComponent } from './package-delivery-system/home/home.component';
import { OTPConfirmationComponent } from './package-delivery-system/otp-confirmation/otp-confirmation.component';
import { PackageRegisterComponent } from './package-delivery-system/package-register/package-register.component';
import { UserPackagesComponent } from './package-delivery-system/user-package/user-package.component';
import { PackageTrackingComponent } from './package-delivery-system/package-tracking/package-tracking.component';
import { UpdateTrackingComponent } from './package-delivery-system/update-tracking/update-tracking.component';
import { PackageHistoryComponent } from './package-delivery-system/package-history/package-history.component';
import { UserProfileComponent } from './package-delivery-system/userprofile/userprofile.component';
import { DeliveryReviewForm } from './package-delivery-system/delivery-review-form/delivery-review-form.component';

const routes: Routes = [ 
  {
    path: "login", 
    component: UserLoginComponent, 
  },
  {
    path : "signup", 
    component: UserSignupComponent, 
    pathMatch: "full", 
  }, 
  {
    path: "logout", 
    component: UserLogoutComponent, 
    pathMatch: "full"
  }, 
  {
    path : "home", 
    component: HomeComponent, 
    pathMatch: "full"
  }, 
  {
    path: "otp-confirmation", 
    component: OTPConfirmationComponent, 
    pathMatch: "full"
  }, 
  {
    path : "package-register",
    component: PackageRegisterComponent, 
    pathMatch: "full"
  },
  {
    path : "track-package-list", 
    component: UserPackagesComponent, 
    pathMatch: "full"
  }, 
  {
    path: "track-package/:id", 
    component: PackageTrackingComponent, 
    pathMatch: "full"
  }, 
  {
    path: "update-tracking/:id", 
    component: UpdateTrackingComponent, 
    pathMatch: "full"
  }, 
  {
    path : "user-package-history", 
    component: PackageHistoryComponent, 
    pathMatch : "full"
  }, 
  {
    path : "user-profile-update", 
    component: UserProfileComponent, 
    pathMatch: "full"
  },
  {
    path : "user-review/:id", 
    component: DeliveryReviewForm, 
    pathMatch: "full"
  }, 
  {
    path : "**", 
    component: HomeComponent, 
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
