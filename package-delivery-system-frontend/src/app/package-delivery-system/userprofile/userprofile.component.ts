import { Component, OnInit } from '@angular/core'; 
import { UserAuthService } from '../../services/user-auth.service';
import { UserDataFormValidatorService } from '../../services/user-data-form-validator.service';
import { UserRegistrationService } from '../../services/user-register.service';
import { Router } from '@angular/router';

@Component(
    {
        selector: 'app-user-profile', 
        templateUrl: './userprofile.component.html', 
        styleUrls: ['./userprofile.component.css'],
    }
)
export class UserProfileComponent implements OnInit {

    notValidDataFlag: boolean = false; 
    userProfileUpdateFlag: boolean = false; 
    message: string = ""; 

    constructor(private userDataFormValidator : UserDataFormValidatorService, 
        private userRegisterService : UserRegistrationService, 
        private router : Router) {

    }

    ngOnInit(): void {
        
    }

    userProfileFormSubmit(userProfileData : any) {
        let statusMessage = this.userDataFormValidator.validateUserProfileForm(userProfileData); 
        if(statusMessage['status'] == 'FAILED') {
            this.notValidDataFlag = true; 
            this.message = statusMessage['message'];
            console.log("user Profile Data Not Validated.");  
        } else {
            this.userRegisterService.updateUserProfile(userProfileData).subscribe((data : any) => {
                if(data['status'] == 'SUCCESS') {
                    this.notValidDataFlag = false; 
                    this.message = "* Your Profile Updated."; 
                    this.userProfileUpdateFlag = true; 
                    setTimeout(() => {
                        this.router.navigateByUrl("/home");
                    }, 1000)
                } else {
                    this.message = "* Some Error, user Profile is not updated."
                }
            })
            console.log("user Profile Data Valided.")
        }   
    }





}