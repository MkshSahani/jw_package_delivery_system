import { Component, OnInit } from '@angular/core'; 
import { UserRegistrationService } from '../../services/user-register.service';
@Component({
    selector: 'app-usersignup-component', 
    templateUrl: './usersignup.component.html', 
    styleUrls: ['./usersignup.component.css'], 
})
export class UserSignupComponent implements OnInit {
    
    userFullName: string = ""; 
    userEmailAddress: string = ""; 
    userPhoneNumber: string = ""; 
    userPassword: string = ""; 
    userCreated: boolean = false; 
    userCreateOperationFailedFlag = false; 

    constructor(private userRegService : UserRegistrationService) {

    }
    
    ngOnInit(): void {
        localStorage.removeItem("userLoginCredData");
    }

    signUpFormSubmit(userSingupData : any) {
        this.userFullName = userSingupData.userFullName; 
        this.userEmailAddress = userSingupData.userEmailAddress; 
        this.userPhoneNumber = userSingupData.userPhoneNumber;
        this.userPassword = userSingupData.userPassword; 

        let userData = {
            userFullName : this.userFullName, 
            userEmailAddress : this.userEmailAddress, 
            userPhoneNumber : this.userPhoneNumber, 
            userPassword : this.userPassword
        }

        console.log(this.userFullName); 
        console.log(this.userEmailAddress); 
        console.log(this.userPhoneNumber); 
        console.log(this.userPassword);

        let responseData = this.userRegService.registerUser(userData).subscribe((data : any) => {
            console.log(data); 
            console.log(data.status)
            if(data.status == 200) {
                this.userCreated = true; 
                this.userCreateOperationFailedFlag = false; 
            } else {
                this.userCreateOperationFailedFlag = true;
                this.userCreated = false;
            }
        });

    }
}