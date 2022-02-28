import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { FetchUserData } from './fetch-user-data.service';

@Injectable({
    providedIn: 'root'
})
export class UserLoginCheck {

    HTTP_SERVICE_PORT_NUMBER: string = "3030"; 
    HTTP_SERVICE_BASE_ADDRESS: string = "localhost"; 
    HTTP_PROTOCOL: string = "http://"; 
    HTTP_END_PONT: string = "/api/auth-user"; 
    HTTP_END_POINT_USER_ACTIVE = "/api/check-user-active";
    constructor(private httpClient : HttpClient) {

    }

    isUserLoginActive() : boolean {
        let getLoginData : any = localStorage.getItem("userLoginCredData"); 
        if(getLoginData == null) {
            return false; 
        } else {
            return true; 
        }
    }

    checkUserCredentials(userData : any) {
        
        let API_END_POINT = this.HTTP_PROTOCOL + this.HTTP_SERVICE_BASE_ADDRESS + ":" + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_END_PONT; 
        console.log(API_END_POINT); 
        let userDataCred: any = {
            userEmailAddress: userData.userEmailAddress, 
            userPassword: userData.userPassword  
        }
        return this.httpClient.post<any>(API_END_POINT, userDataCred);
    }

    checkUserActive(userData : any) {
        let API_END_POINT = this.HTTP_PROTOCOL + this.HTTP_SERVICE_BASE_ADDRESS + ":" + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_END_POINT_USER_ACTIVE;
        let userDataCred: any = {
            userEmailAddress : userData.userEmailAddress
        }
        return this.httpClient.post<any>(API_END_POINT, userDataCred);
    }

}
