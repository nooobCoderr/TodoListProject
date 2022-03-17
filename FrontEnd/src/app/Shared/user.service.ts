import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registered:Boolean=false;
  registerError:Boolean=false;
  selectedUser!: User;
  users!: User[];

  url= "http://localhost:3200/users";

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(this.url,user);
  }
  getUsers(){
    return this.http.get(this.url);
  }
  deleteUser(id: string){
    return this.http.delete(this.url+"/"+id);
  }
  validateUser(id: string, pwd: string){
    console.log(id);
    if(pwd === undefined) pwd = "(&)*^(%(&";
    return this.http.get(this.url+"/"+id+"/"+pwd);
  }

  
  refreshUserList(){
    this.getUsers().subscribe((res)=>{
      this.users = res as User[];
    })
  }

}
