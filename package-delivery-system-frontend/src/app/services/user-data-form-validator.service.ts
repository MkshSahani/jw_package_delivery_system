import { Injectable } from '@angular/core'; 

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UserDataFormValidatorService {

    validateUserProfileForm(userProfileData : any) {

        if(userProfileData.firstName == "") {
            return {
                status : 'FAILED', 
                message : "* First Name can't be Empty"
            }
        } else if(userProfileData.secondName == "") {
            return {
                status : 'FAILED', 
                message : "* Second Name can't be Empty"   
            }
        } else if(userProfileData.emailAddress == "") {
            return {
                status : 'FAILED', 
                message : "* Email Address can't be Empty"
            }
        } else if(userProfileData.phoneNumber == "") {
            return {
                status : 'FAILED', 
                message : "* Phone Number can't be Empty" 
            }
        } else if(userProfileData.country == "") {
            return {
                status : 'FAILED', 
                message : "* Country Name can't be Emtpy"
            }
        } else if(userProfileData.state == "") {
            return {
                status : 'FAILED',  
                message : "* State Name can't be Empty"
            }
        } else if(userProfileData.city == "") {
            return {
                status : 'FAILED', 
                message : "* City Name can't be Empty"
            }
        } else if(userProfileData.zipCode == "") {
            return {
                status : 'FAILED', 
                message: "* Zip Code can't be Empty"
            }
        } else {
            return {
                status : 'SUCCESS', 
                message : "Form is Validated."
            }
        }
    }

}