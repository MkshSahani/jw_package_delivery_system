import { Component, OnInit } from '@angular/core'; 
import { UserAuthService } from '../../services/user-auth.service'; 
import { PackageAPIService } from '../../services/package-api.service';

@Component(
    {
        selector: 'app-package-history', 
        templateUrl: './package-history.component.html', 
        styleUrls: ['./package-history.component.css']
    }
)
export class PackageHistoryComponent implements OnInit {

    list_of_package : any = []; 

    constructor(private userAuthService : UserAuthService, private packageAPIService : PackageAPIService)  {

    }

    ngOnInit(): void {
        this.userAuthService.checkAccessRights()
        let userData : any = localStorage.getItem("userLoginCredData"); 
        userData = JSON.parse(userData); 
        console.log(userData); 
        this.packageAPIService.getListPackages(userData).subscribe((data : any) => {
            console.log(data);
            this.list_of_package = data; 
        })

        console.log(this.list_of_package);
    }
}