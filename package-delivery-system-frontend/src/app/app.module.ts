import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login-singup/userlogin/userlogin.component';
import { FormsModule } from '@angular/forms';
import { UserSignupComponent } from './user-login-singup/usersignup/usersignup.component';
import { NavBarComponent } from './package-delivery-system/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http'; 
import { HomeComponent } from './package-delivery-system/home/home.component';
import { OTPConfirmationComponent } from './package-delivery-system/otp-confirmation/otp-confirmation.component';
import { PackageRegisterComponent } from './package-delivery-system/package-register/package-register.component';
import { UserPackagesComponent } from './package-delivery-system/user-package/user-package.component';
import { PackageTrackingComponent } from './package-delivery-system/package-tracking/package-tracking.component'; 
import { UpdateTrackingComponent } from './package-delivery-system/update-tracking/update-tracking.component'; 
import { PackageHistoryComponent } from './package-delivery-system/package-history/package-history.component'; 
import { UserProfileComponent } from './package-delivery-system/userprofile/userprofile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryReviewForm } from './package-delivery-system/delivery-review-form/delivery-review-form.component';
@NgModule({
  declarations: [
    AppComponent, 
    UserLoginComponent, 
    UserSignupComponent, 
    NavBarComponent,
    HomeComponent, 
    OTPConfirmationComponent, 
    PackageRegisterComponent, 
    UserPackagesComponent, 
    PackageTrackingComponent, 
    UpdateTrackingComponent, 
    PackageHistoryComponent, 
    UserProfileComponent, 
    DeliveryReviewForm 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
