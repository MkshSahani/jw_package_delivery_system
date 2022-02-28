import { Component } from '@angular/core';
import { UserLoginCheck } from './services/user-login-check.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'package-delivery-system-frontend';
  validUser: boolean = false; 
  constructor(private userLoginCheckService : UserLoginCheck) {

  }

}
