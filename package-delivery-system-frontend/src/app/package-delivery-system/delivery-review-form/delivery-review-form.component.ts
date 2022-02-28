import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormControl } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { PackageAPIService } from '../../services/package-api.service';

@Component(
    {
        selector: 'app-delivery-review-form', 
        templateUrl : './delivery-review-form.component.html', 
        styleUrls: ['./delivery-review-form.component.css']
    }
)
export class DeliveryReviewForm implements OnInit {
    
    packageID: any; 
    reviewForm: any; 
    reviewContent: any; 
    reviewAddedFlag: boolean = false; 
    reviewMessage: string = ""; 

    constructor(private route : ActivatedRoute, 
        private packageAPIService : PackageAPIService, 
        private router : Router) {

    }

    
    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.packageID = params.get('id'); 
            console.log(parseInt(this.packageID)); 
        });  


        this.reviewForm = new FormGroup(
            {
                reviewContent : new FormControl()
            }
        ); 

    }

    reviewFormSubmit(reviewData : any) {
        
        this.reviewContent = reviewData.reviewContent; 
        reviewData['packageID'] = this.packageID; 
        console.log(this.reviewContent);
        console.log(reviewData);
     
        this.packageAPIService.addPackageReview(reviewData).subscribe((data : any) => {
            console.log(data); 
            if(data['status'] == 'SUCCESS') {
                this.reviewAddedFlag = true;                
                this.reviewMessage = "* Your Review Has Been Added."; 
                setTimeout(() => {
                    this.router.navigateByUrl('/track-package-list'); 
                }, 1000); 
            }
        })
    }

}