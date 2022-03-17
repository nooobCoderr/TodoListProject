import { Component } from '@angular/core';
import { LoginGuard } from './Shared/login.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';

  constructor(public _auth:LoginGuard) { };

  logout(){
    this._auth.validatedUser = false;
    this._auth.loggedInUser = "";
  }
}
