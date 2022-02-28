import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { UserLoginCheck } from './user-login-check.service';
import { Router } from '@angular/router';

@Injectable(
    {
        providedIn: 'root'         
    }
)
export class UserAuthService {

    HTTP_SERVICE_PORT_NUMBER: string = "3030"
    HTTP_SERVICE_BASE_ADDRESS:string = "localhost"; 
    HTTP_END_POINT: string = "api/auth-user"; 
    HTTP_OTP_SEND_END_POINT: string = "api/send-otp";
    HTTP_OTP_VALIDATE_END_POINT:string = "api/validate-otp"; 

    constructor(private httpClient : HttpClient,  private userLoginCheck : UserLoginCheck, private router : Router) {

    }

    authenticateUser(userData : any): any {
        let api_end_point: string = "http://" + this.HTTP_SERVICE_BASE_ADDRESS + ":" + this.HTTP_SERVICE_PORT_NUMBER + "/" + this.HTTP_END_POINT;
        console.log("API Endpoint : " + api_end_point); 
        return this.httpClient.post<any>(api_end_point,userData);
    }

    sendOTP(userData : any) : any {
        let api_end_point: string = "http://" + this.HTTP_SERVICE_BASE_ADDRESS + ":" + this.HTTP_SERVICE_PORT_NUMBER + "/" + this.HTTP_OTP_SEND_END_POINT;
        console.log("API EndPoint : " + api_end_point); 
        let OTPAPIData = {
            userPhoneNumber : userData.userPhoneNumber,
            userEmailAddress : userData.userEmailAddress
        }

        return this.httpClient.post<any>(api_end_point, OTPAPIData); 
    }

    validateOTP(userData : any) : any {
        let api_end_point: string = "http://" + this.HTTP_SERVICE_BASE_ADDRESS + ":" + this.HTTP_SERVICE_PORT_NUMBER + "/" + this.HTTP_OTP_VALIDATE_END_POINT;
        console.log(api_end_point);
        console.log(userData); 
        return this.httpClient.post<any>(api_end_point, userData); 
    }


    checkAccessRights() : any {
        let userData: any = localStorage.getItem("userLoginCredData");
        if(userData == null) {
            this.router.navigateByUrl("/login");
        }
        let userDataJson = JSON.parse(userData);
        this.userLoginCheck.checkUserActive(userDataJson).subscribe((data : any) => {
            if(!data[0]['is_active']) {
                this.router.navigateByUrl("/otp-confirmation"); 
            }
        })

        this.userLoginCheck.checkUserActive(userDataJson).subscribe((data) => {
            if(!data[0]['is_active']) {
                this.router.navigateByUrl("/otp-confirmation"); 
            }
        })

    }
  
}