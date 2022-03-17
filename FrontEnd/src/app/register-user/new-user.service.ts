import { Injectable } from '@angular/core';
import { Todo } from '../Shared/todo.model';
import { TodoService } from '../Shared/todo.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  user:string = "";
  userData !: Todo;

  constructor(private _todo: TodoService) { }

  sendNewUserData(){
    this.userData = {
      _id: this.user,
      item: ["New User Text1", "New User Text2", "New User Text3"]
    }
    this._todo.postTodo(this.userData).subscribe((res)=>{
          this._todo.refreshTodoList();
    })
  }
}
