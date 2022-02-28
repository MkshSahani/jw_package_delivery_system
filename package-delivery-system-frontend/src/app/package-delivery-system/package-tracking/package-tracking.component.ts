import { AbstractType, Component, OnInit } from '@angular/core'; 
import { Router,ParamMap,ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { PackageAPIService } from '../../services/package-api.service';

@Component(
    {
        selector: 'app-package-tracking', 
        templateUrl: './package-tracking.component.html', 
        styleUrls: ['./package-tracking.component.css']
    }
)
export class PackageTrackingComponent implements OnInit {

    packageID:any = ""; 
    packageDataObject: any; 
    isDelivered: boolean = false; 
    trackingDataFlag:boolean = true; 
    noDataFlag: boolean = true; 
    packageTrackingData: any; 


    constructor(private userAuthService : UserAuthService, private route : ActivatedRoute, private packageAPIService : PackageAPIService) {

    }

    ngOnInit(): void {
        // check rights of user. 
        this.userAuthService.checkAccessRights(); 
        // decode route to fetch data from activeRoute.
        this.route.paramMap.subscribe(params => {
            this.packageID = params.get('id'); 
            console.log(parseInt(this.packageID)); 
        });    

        // Hit API POST request to fetch data. 
        let userData : any = localStorage.getItem("userLoginCredData");
        let packageData = JSON.parse(userData); 
        console.log(packageData); 
        packageData['packageID'] = parseInt(this.packageID); 
        console.log(packageData);
        this.packageAPIService.getPackageData(packageData).subscribe((data : any) => {
            this.packageDataObject = data[0]; 
            this.isDelivered = !(this.packageDataObject['is_deliverd']);
        })

        // Hit API POST request for Fetch Tracking data. 
        let packageTrackingData = {
            'packageID' : parseInt(this.packageID)
        }

        this.packageAPIService.getTrackingData(packageTrackingData).subscribe((data : any) => {
            if(data.length == 0) {
                this.trackingDataFlag = false; 

            } else {
                this.packageTrackingData = data;  
                this.noDataFlag = false; 
            }
        })

    }
}