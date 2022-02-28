import { Component,OnInit } from '@angular/core'; 
import { UserAuthService } from '../../services/user-auth.service';  
import { FetchUserData } from '../../services/fetch-user-data.service';

@Component({
    selector: 'app-home', 
    templateUrl: './home.component.html', 
    styleUrls: ['./home.component.css'], 
    providers: [UserAuthService]
})
export class HomeComponent implements OnInit {

    fullName: string = ""; 
    emailAddress: string = ""; 
    phoneNumber: string = "";
    

    constructor(private userAuthService : UserAuthService, private fetchUserData : FetchUserData) {


    }

    ngOnInit(): void {
        // check access right based on OTP confirmation and user registerd. 
        this.userAuthService.checkAccessRights();
        this.fetchUserData.fetchData().subscribe((data : any) => {
            data = data[0]; 
            console.log(data);
            this.fullName = data['fullname']; 
            this.emailAddress = data['user_email']; 
            this.phoneNumber = data['phone_number']; 
        })
    }
}