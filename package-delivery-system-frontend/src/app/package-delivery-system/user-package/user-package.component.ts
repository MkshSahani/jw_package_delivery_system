import { Component, OnInit } from '@angular/core'; 
import { UserAuthService } from '../../services/user-auth.service';  
import { PackageAPIService } from '../../services/package-api.service';

@Component(
    {
        selector: 'app-user-packages',
        templateUrl: './user-package.component.html', 
        styleUrls: ['./user-package.component.css'], 
        providers: [UserAuthService]

    }
)
export class UserPackagesComponent implements OnInit {
    
    list_of_package: any = []; 
    discountCouptonVisible:boolean = false; 
    constructor(private userAuthService : UserAuthService, private packageApiService : PackageAPIService) {

    }

    ngOnInit(): void {
        // check whether user is allowed to view the component. 
        this.userAuthService.checkAccessRights(); 
        // fetch user Data. 
        let userData : any = localStorage.getItem("userLoginCredData"); 
        userData = JSON.parse(userData); 
        console.log(userData);
        this.packageApiService.getListOfUnderlivererPackage(userData).subscribe((data : any) => {
            console.log(data);
            this.list_of_package = data; 
        })
    }

    makeDiscoutCouponVisible($event : any) {
        console.log($event); 
        this.discountCouptonVisible = true; 
    }
}