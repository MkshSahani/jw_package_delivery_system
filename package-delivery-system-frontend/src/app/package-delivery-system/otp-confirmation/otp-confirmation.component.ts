import { Component, OnInit } from '@angular/core'; 
import { FetchUserData } from '../../services/fetch-user-data.service';
import { UserAuthService } from '../../services/user-auth.service';
import { UserLoginCheck } from '../../services/user-login-check.service';
import { Router } from '@angular/router';
@Component({
    selector: "app-otp-confirmation", 
    templateUrl : './otp-confirmation.component.html', 
    styleUrls: ['./otp-confirmation.component.css'],
    providers: [FetchUserData, UserAuthService]
})
export class OTPConfirmationComponent implements OnInit {

    fullName: string = ""; 
    emailAddress: string = ""; 
    phoneNumber: string = ""; 
    otpSent:boolean = false; 
    wrongOtp: boolean = false; 


    constructor(private fetchUserData : FetchUserData, private userAuthService : UserAuthService, private userLoginCheck : UserLoginCheck, private router : Router) {

    }

    ngOnInit(): void {
        let userData: any = localStorage.getItem("userLoginCredData");
        let userDataJson = JSON.parse(userData);
        this.userLoginCheck.checkUserActive(userDataJson).subscribe((data) => {
            if(data[0]['is_active']) {
                this.router.navigateByUrl("/home"); 
            }
        })
        
        this.fetchUserData.fetchData().subscribe((data) => {
            console.log(data[0]);
            this.fullName = data[0]['fullname']; 
            this.phoneNumber = data[0]['phone_number'];
            this.emailAddress = data[0]['user_email']; 
        })

    }

    sendOTP() : void {
        this.wrongOtp = false; 
        let otpJSONData = {
            userPhoneNumber : this.phoneNumber, 
            userEmailAddress: this.emailAddress
        }

        this.userAuthService.sendOTP(otpJSONData).subscribe((data : any) => {
            console.log(data);
            if(data['status'] == "SUCCESS") {
                this.otpSent = true; 
            }
        })
    }

    validateOTP(otpData : any) : void {
        let otpEntered = otpData.userOTP; 
        let APIRequestObject = {
            userEmailAddress : this.emailAddress, 
            otpEntered : otpEntered
        }
        this.otpSent = false; 
        console.log(APIRequestObject);
        this.userAuthService.validateOTP(APIRequestObject).subscribe((data : any) => {
            console.log("--------------");
            console.log(data); 
            console.log("---------------");
            if(data['status'] == 'FAILED') {
                console.log("Wrong OTP");
                this.wrongOtp = true; 
            } else {
                this.wrongOtp = false; 
                this.router.navigateByUrl("/user-profile-update");
            } 
        })
    }
}