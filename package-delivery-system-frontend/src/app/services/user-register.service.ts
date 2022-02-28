import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserRegistrationService {
    constructor(private httpClient : HttpClient) {

    }
    HTTP_PROTOCOL: string = "http://"; 
    BASE_ADDRESS: string = "localhost:3030"; 
    SIGNUP_END_POINT: string = "/api/add-user"
    PROFILE_UPDATE:string = "/api/update-user-profile";
    response: any = undefined;

    registerUser(userData : any) : any {
        let apiEndPoint: string = this.HTTP_PROTOCOL + this.BASE_ADDRESS + this.SIGNUP_END_POINT; 
        return this.httpClient.post<any>(apiEndPoint, userData);
    }

    updateUserProfile(profileData : any) {
        let apiEndPoint:string = this.HTTP_PROTOCOL + this.BASE_ADDRESS + this.PROFILE_UPDATE; 
        return this.httpClient.post<any>(apiEndPoint, profileData);
    }

}