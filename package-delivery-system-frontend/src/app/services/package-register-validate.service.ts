import { Injectable } from '@angular/core'; 

@Injectable(
    {
        providedIn : 'root'
    }
)
export class PackageRegValidateService {


    validateInputPackage(packageData : any) {
        let message:string = ""; 
        let status: boolean = true; 
        if(packageData.packageName == "") {
            message = "* Package Name can't be Emtpy"; 
            status = false; 
            return {
                message : message, 
                status: status 
            }
        }   
        
        if(packageData.packageType == "") {
            message = "* Package Type can't be Empty"; 
            status = false; 
            return {
                message : message, 
                status : status 
            }
        }

        if(packageData.packageLength == "") {
            message = "* Package Length is not Filled."
            status = false; 
            return {
                message : message, 
                status : status 
            }
        } else {
            console.log(parseInt(packageData.packageLength));
            if(isNaN(packageData.packageLength)) {
                message = "* Please enter a number in package length fileld"; 
                status = false; 
                return {
                    message : message, 
                    status : status 
                }
            }
        }


        if(packageData.packageBreadth == "") {
            message = "* Package Breadth is not Filled."
            status = false; 
            return {
                message : message, 
                status : status 
            }
        } else {
            if(isNaN(packageData.packageBreadth)) {
                message = "* Please enter a number in package breadth fileld"; 
                status = false; 
                return {
                    message : message, 
                    status : status 
                }
            }
        }


        if(packageData.packageWeight == "") {
            message = "* Package Weigth is not Filled."
            status = false; 
            return {
                message : message, 
                status : status 
            }
        } else {
            if(isNaN(packageData.packageWeight)) {
                message = "* Please enter a number in package Weigth fileld"; 
                status = false; 
                return {
                    message : message, 
                    status : status 
                }
            }
        }


        if(packageData.packagePickupAddress == "") {
            message = "* Package Pickup Address can't be Empty"; 
            status = false; 
            return {
                message : message, 
                status : status 
            }
        }

        if(packageData.packageDropDownAddress == "") {
            message = "* Package Drop Down address can't be Empty"; 
            status = false; 
            return {
                message : message, 
                status : status 
            }
        }

        if(packageData.packagePhoneNumber == "") {
            message = "* Package Alternative Phone Number can't be Empty"; 
            status = false; 
            return {
                message : message, 
                status : status 
            }
        }

        message = "* Package Registered SuccessFully"; 

        return {
            message : message, 
            status : status 
        }



    }

}