import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  
  validatedUser:boolean = false;
  loggedInUser:string = "";
  // validatedUser:boolean = true;
  // loggedInUser:string = "abc@xyz.com";

  constructor(private router: Router) { }
  
  canActivate(): boolean {
    if(this.validatedUser)
      return true;
    else{
      this.router.navigate(['**']);
        return false;
    }
  }
  
}
