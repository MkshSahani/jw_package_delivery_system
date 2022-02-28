import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-logout', 
    templateUrl: './userlogout.component.html', 
    styleUrls: ['./userlogout.component.css']
})
export class UserLogoutComponent implements OnInit{
    constructor(private router : Router) {

    }

    ngOnInit(): void {
        localStorage.removeItem("userLoginCredData"); 
        this.router.navigateByUrl("/login");
    }
}