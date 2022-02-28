import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FetchUserData {

    // API end point for fetch data for specific user. 
    api_end_point: string = "http://localhost:3030/api/fetch-user-data"; 

    constructor(private httpClient : HttpClient) {

    }


    fetchData() {
        // userData : get user data from localStorage. 
        let userData : any= localStorage.getItem("userLoginCredData");
        let userDataJSON = JSON.parse(userData); 
        // we fetch email address from localStroge data. 
        let req_data = {
            userEmailAddress : userDataJSON['userEmailAddress']
        }
        return this.httpClient.post<any>(this.api_end_point, req_data);
    }
}