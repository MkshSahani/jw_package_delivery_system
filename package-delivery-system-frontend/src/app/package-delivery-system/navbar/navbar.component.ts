import { Component, OnInit } from "@angular/core"; 
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar', 
    templateUrl: './navbar.component.html', 
    styleUrls: ['./navbar.component.css']
}) 
export class NavBarComponent implements OnInit {
    
    constructor(private router : Router) {

    }
    
    ngOnInit(): void {
        // ----- check localstorage ----- 
        let userData = localStorage.getItem("userLoginCredData"); 
        if(userData == undefined) {
            this.router.navigateByUrl('/login'); 
        } else {
            
        }
    }
}
