import { Injectable } from '@angular/core'; 
import {  HttpClient } from '@angular/common/http'; 


/**
 * PackageAPIService -> api Hits about Package CREATION, UPDATION, DELETION. 
 * */

@Injectable({
    providedIn: 'root'
})
export class PackageAPIService {
    
    // ------------ data for creating api end point ---------------- 
    HTTP_PROTOCOL: string = "http://"; 
    HTTP_BASE_ADDRESS: string = "localhost"; 
    HTTP_SERVICE_PORT_NUMBER = ":3030"; 
    HTTP_SERVICE_END_POINT = "/api/register-package"; 
    HTTP_SERVICE_TRACK_PACKAGE_LIST_END_POINT = "/api/track-package-list"; 
    HTTP_SERVICE_PACKAGE_DATA_END_POINT = "/api/package-data"; 
    HTTP_SERVICE_PACKAGE_TARCKING_DATA = "/api/tracking-data"; 
    HTTP_SERVICE_PACKAGE_COST_END_PONT= "/api/estimate-cost"; 
    HTTP_SERVICE_PACKAGE_LIST = "/api/package-history-list";
    HTTP_SERVICE_ADD_REVIEW_END_POINT = "/api/add-review";

    constructor(private httpClient : HttpClient) {

    }

    /**
     * @name : registerPackage 
     * @param packageData -> contain all data about package need to create package. 
     */
    registerPackage(packageData : any) : any{
        let api_end_point = this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_SERVICE_END_POINT; 
        console.log(api_end_point); 
        return this.httpClient.post<any>(api_end_point, packageData); 
    }

    /** 
     * @name : getListofUnderliverPackage -> fetch list of all package under user loginned currently. 
     * @param userData -> object contain data regarding 
    */

    getListOfUnderlivererPackage(userData : any) : any{
        console.log(userData);
        let api_end_point = this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_SERVICE_TRACK_PACKAGE_LIST_END_POINT; 
        let packageData = {
            userEmailAddress : userData.userEmailAddress
        }
        console.log(api_end_point); 
        return this.httpClient.post<any>(api_end_point, packageData); 
    }


    getPackageData(packageData : any)  : any {
        console.log(packageData); 
        let api_end_point = this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_SERVICE_PACKAGE_DATA_END_POINT; 
        console.log(api_end_point); 
        return this.httpClient.post<any>(api_end_point, packageData); 

    }

    getTrackingData(packageData : any) : any {
        console.log(packageData);
        let api_end_point =  this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER +  this.HTTP_SERVICE_PACKAGE_TARCKING_DATA; 
        console.log(api_end_point); 
        return this.httpClient.post<any>(api_end_point, packageData);   
    }

    getPackageCost(packageCostData : any) : any {
        console.log(packageCostData); 
        let api_end_point = this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_SERVICE_PACKAGE_COST_END_PONT; 
        console.log(api_end_point); 
        return this.httpClient.post<any>(api_end_point, packageCostData); 
    }

    getListPackages(userData : any) {
        console.log(userData); 
        let api_end_point = this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_SERVICE_PACKAGE_LIST;
        console.log(api_end_point); 
        return this.httpClient.post<any>(api_end_point, userData); 
    }

    addPackageReview(packageReviewData : any) {
        console.log(packageReviewData); 
        let api_end_point = this.HTTP_PROTOCOL + this.HTTP_BASE_ADDRESS + this.HTTP_SERVICE_PORT_NUMBER + this.HTTP_SERVICE_ADD_REVIEW_END_POINT;
        return this.httpClient.post<any>(api_end_point, packageReviewData); 
    }
}