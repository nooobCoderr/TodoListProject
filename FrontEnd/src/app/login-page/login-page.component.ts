import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGuard } from '../Shared/login.guard';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  validationError:boolean = false;

  constructor(public _user: UserService, private _auth: LoginGuard, private _router:Router) { }

  ngOnInit(): void {
    this._user.refreshUserList();
    // this.loginForm = new FormGroup({
    //   _id : new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    //   password : new FormControl("",[Validators.required, Validators.minLength(5)])
    // })
    this.loginForm = new FormGroup({
      _id : new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password : new FormControl("",[Validators.required, Validators.minLength(5)])
    })
  }

  loginForm:any;

  logIn(obj:any){
    console.log(obj.value._id);
    console.log(obj.value.pwd)
    this._user.validateUser(obj.value._id,obj.value.password).subscribe((res)=>{
      console.log("Response is:"+res);
      if(res == null) {
        this._auth.validatedUser = false;
        this.validationError = true;
        console.log("validation Error1: "+this.validationError);
      }
      else{
        console.log("validation Error: "+this.validationError);
        this._auth.loggedInUser = obj.value._id;
        this.loginForm.reset();
        this._auth.validatedUser = true;
        this.validationError = false;
        console.log("validation Error2: "+this.validationError);
        this._router.navigate(['todoList']);
      }
      console.log("Validated user: "+this._auth.validatedUser);
    },(err)=>{
      console.log("Error: "+err);
    });
  }
}
