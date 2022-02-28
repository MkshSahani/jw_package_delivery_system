import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute } from '@angular/router';
import { PackageTrackingService } from '../../services/package-tracking.service';
import { PackageAPIService } from '../../services/package-api.service';
import { Router } from '@angular/router';

@Component (
    {
        selector: 'app-update-tracking', 
        templateUrl: './update-tracking.component.html', 
        styleUrls: ['./update-tracking.component.css']
    }
)
export class UpdateTrackingComponent implements OnInit {

    packageID: any; 
    data: string = "check";
    validationFailed: boolean = false; 
    validationStatusMessage: string = ""; 
    trackingDataUpdate: boolean = false; 
    constructor(private route : ActivatedRoute, private packageTrackingService : PackageTrackingService, private router : Router) {

    }

    ngOnInit(): void {
        
        this.route.paramMap.subscribe(params => {
            this.packageID = params.get('id'); 
            console.log(parseInt(this.packageID)); 
        });    
        console.log(this.packageID); 
        let trackingID = parseInt(this.packageID); 

    }

    updateTracking(trackingData : any) {
        trackingData['packageID'] = parseInt(this.packageID); 
        console.log(trackingData);
        let statusMessage = this.packageTrackingService.validatePackageTrackingData(trackingData); 
        console.log(statusMessage);
        if(statusMessage['status'] == 'FAILED') {
            this.validationFailed = true; 
            this.validationStatusMessage = statusMessage['message']; 
        } else {
            this.validationFailed = false;
            this.packageTrackingService.updateTrackinData(trackingData).subscribe((data  : any) => {
                console.log(data);
                if(data['status'] == 'SUCCESS') {
                    this.trackingDataUpdate = true; 
                    this.validationStatusMessage = "* Tracking Data Has Been Updated.";
                    if(trackingData['packageStatus'].toUpperCase() == 'DELIVERED') {
                        setTimeout(() => {
                            this.router.navigateByUrl(`/user-review/${this.packageID}`); 
                        }, 1000); 
                    } 
                }
            } );  
        }
    }
}