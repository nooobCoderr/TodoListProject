import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginGuard } from './login.guard';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  selectedItem!: Todo;
  items!: any;
  itemsLength:Number = 0;
  userItemList: any = [{
    _id: "",
    item: [""]
  }];

  url= "http://localhost:3200/todo";

  constructor(private http: HttpClient, private _auth: LoginGuard) { }

  postTodo(item: Todo){
    return this.http.post(this.url,item);
  }
  getTodos(){
    return this.http.get(this.url);
  }
  updateTodo(item: Todo){
    console.log("updateTodo Item: "+item._id);
    return this.http.put(this.url+"/"+item._id, item);
  }
  deleteTodo(id: string){
    return this.http.delete(this.url+"/"+id);
  }

  refreshTodoList(){
    this.getTodos().subscribe((res)=>{
      this.items = res as Todo;
      if(this._auth.validatedUser){
        this.itemsLength = 0;
        for (var _i = 0; _i < this.items.length; _i++) {
          if(this.items[_i]._id.indexOf(this._auth.loggedInUser) !== -1) this.userItemList = (this.items[_i]);
        }
        this.itemsLength = this.userItemList.item.length;
      }
    })
  }
}
