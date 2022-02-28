import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn : 'root'
})
export class PackageTrackingService {
    constructor(private httpClient : HttpClient) {

    }

    validatePackageTrackingData(packageTrackingData : any) {
        
        if(packageTrackingData.lastLocation == "") {
            return {
                status : 'FAILED', 
                message : "* Last Location can't be Emtpy" 
             }
        }
        if(packageTrackingData.packageStatus == "") {
            return {
                status : 'FAILED', 
                message : "* Package Status can't be Empty"
            }
        } else {
            return {
                status : 'SUCCESS', 
                message : "* Tracking Data is Valide!, please update."
            }
        }
    }


    updateTrackinData(packageTrackingData : any) {
        let api_end_point = "http://localhost:3030/api/update-tracking-data"; 
        return this.httpClient.post<any>(api_end_point, packageTrackingData);
    }
}