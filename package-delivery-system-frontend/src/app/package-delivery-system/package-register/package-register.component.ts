import { Component, OnInit } from '@angular/core'; 
import { UserAuthService } from '../../services/user-auth.service';
import { PackageAPIService } from '../../services/package-api.service'; 
import { PackageRegValidateService } from '../../services/package-register-validate.service';

@Component({
    selector: 'app-package-register', 
    templateUrl: './package-register.component.html', 
    styleUrls: ['./package-register.component.css'], 
})
export class PackageRegisterComponent implements OnInit {

    emailAddress:string = ""; 
    packageRegistrationSuccessFull: boolean = false; 
    packageDataError: boolean =  false; 
    packageDataErrorMessage: string = ""; 
    packageCostVisibleFlag: boolean = false; 
    packageCostMessage: string = ""; 
    couponCodeEnableFlag: boolean = false; 


    constructor(private userAuthService : UserAuthService, 
        private packageApiService : PackageAPIService, 
        private packageRegService : PackageRegValidateService) {

    }

    ngOnInit(): void {
        this.userAuthService.checkAccessRights(); 
        let userData: any = localStorage.getItem("userLoginCredData"); 
        let userDataJson = JSON.parse(userData); 
        this.emailAddress = userDataJson['userEmailAddress']; 
    }

    registerPackage(packageData : any) {
        // let packageName = packageData.packageName; 
        // let packageType = packageData.packageType; 
        // let packageLength = packageData.packageLength; 
        // let packageWeight = packageData.packageWeight; 
        // let packageBreadth = packageData.packgeBreadth; 
        // let packagePickupAddress = packageData.packagePickupAddress; 
        // let packageDropDownAddress = packageData.packageDropDownAddress; 
        // let packagePhoneNumber = packageData.packagePhoneNumber; 
        packageData['registerBy'] = this.emailAddress; 
        console.log(packageData); 

        let messageStatus = this.packageRegService.validateInputPackage(packageData); 
        if(messageStatus.status == true) {
            this.packageApiService.registerPackage(packageData).subscribe((data : any) => {
                console.log(data); 
                if(data['status'] == 'SUCCESS') {
                    this.packageRegistrationSuccessFull = true; 
                    this.packageDataError = false; 
                    this.packageDataErrorMessage = "";
                }
            })
    
        } else {
            this.packageDataError = true; 
            this.packageDataErrorMessage = messageStatus.message; 
        }
    }


    getEstimatedCost($event : any, packageData : any) {

        let messageStatus = this.packageRegService.validateInputPackage(packageData);
        if(messageStatus['status'] == true) 
        {                   
            this.packageDataError = false; 
            this.packageDataErrorMessage = "";
            console.log($event); 
            console.log(packageData); 
            let packageCostData = {
                'packageLength' : parseInt(packageData.packageLength), 
                'packageWeight' : parseInt(packageData.packageWeight), 
            }; 
    
            this.packageApiService.getPackageCost(packageCostData).subscribe((data : any) => {
                this.packageCostVisibleFlag = true; 
                let packageCost = data['cost']; 
                this.packageCostMessage = `Cost for Your Package : ${packageCost}`; 
                this.packageRegistrationSuccessFull = false; 
            })
        } else {
            this.packageDataError = true; 
            this.packageDataErrorMessage = messageStatus.message  
            this.packageRegistrationSuccessFull = false; 
        }
    }

    couponCodeBtn($event : any) {
        if(this.couponCodeEnableFlag) { 
            this.couponCodeEnableFlag = false; 
        } else {
            this.couponCodeEnableFlag = true; 
        }
    }
}