import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../Shared/user.service';
import { NewUserService } from './new-user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm:any;
  // @ViewChild('closebutton') closebutton: any;

  constructor(public _user: UserService, private _newUser: NewUserService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      _id : new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password : new FormControl("", [Validators.required, Validators.minLength(5)]),
      cnfPassword: new FormControl("", [Validators.required, this.matchPassword])
    })
  }
  
  matchPassword(control:any){
    if(control.value != null){
      let pass = control.root.get('password')
      if(pass){
        if(pass.value != control.value)
          return { cnfPassword: true}
        else
          return null
      }
    }
    return null
  }

  register(obj:NgForm){
    console.log(obj.value);
    // this.closebutton.nativeElement.click();
    this._user.postUser(obj.value).subscribe((res)=>{
      console.log("Response is: "+res)
      if(res !== null){
        this._user.registered = true;
        this._user.registerError = false;
        this._newUser.user = obj.value._id;
        this._newUser.sendNewUserData();
        this.registerForm.reset();
      }
      else{
        this._user.registered = false;
        this._user.registerError = true;
        this.registerForm.reset();
      }
    })
    this._user.refreshUserList();
  }

}
