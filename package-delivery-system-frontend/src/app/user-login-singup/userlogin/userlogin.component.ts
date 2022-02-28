import  { Component,OnInit } from '@angular/core'; 
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login', 
    templateUrl: './userlogin.component.html', 
    styleUrls: ['./userlogin.component.css'], 
    providers: [UserAuthService]
})
export class UserLoginComponent implements OnInit {
    
    loginFailed: boolean = false; 
    userEmailAddress: string = ""; 
    userPassword: string = ""; 
    
    constructor(private userAuthService : UserAuthService, private router : Router) {
    }

    ngOnInit(): void {
        localStorage.removeItem("userLoginCredData");
    }

    submitLoginForm(userLoginFormData : any) {
        this.userEmailAddress = userLoginFormData.emailAddress; 
        this.userPassword = userLoginFormData.userPassword; 
        console.log(this.userEmailAddress); 
        console.log(this.userPassword); 
        let userData = {
            userEmailAddress : this.userEmailAddress, 
            userPassword : this.userPassword
        }

        this.userAuthService.authenticateUser(userData).subscribe((data : any) => {
            console.log(data); 
            if(data.validated && data.status == 'SUCCESS') {
                // update local storage. 
                localStorage.setItem("userLoginCredData",JSON.stringify(userData));
                this.router.navigateByUrl("/home");
            } else {
                localStorage.removeItem("userLoginCredData");
                this.loginFailed = true; 
            }
        })

    }
}