import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginGuard } from '../Shared/login.guard';
import { TodoService } from '../Shared/todo.service';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoForm: any;
  toAdd!: any;
  @ViewChild('closebutton') closebutton: any;
  temporaryUserItemList: any = [{
    _id: "",
    item: [""]
  }];

  constructor(public _todo: TodoService, public _auth: LoginGuard, 
    public _user: UserService, private router: Router) { }

  ngOnInit(): void {
    this._todo.refreshTodoList();
    this.todoForm = new FormGroup({
      _id: new FormControl(""),
      item : new FormControl("", Validators.required)
    })
  }

  resetTempUserList(){
    this.temporaryUserItemList = [{
      _id: "",
      item: [""]
    }]
  }

  addItem(obj:NgForm){
    this.temporaryUserItemList = this._todo.userItemList;
    this.temporaryUserItemList.item.push(obj.value.item);
    console.log("toAdd is: "+JSON.stringify(this.temporaryUserItemList));
    this._todo.updateTodo(this.temporaryUserItemList).subscribe((res)=>{
      this.todoForm.reset();
      this._todo.refreshTodoList();
      this.resetTempUserList();
    })
  }

  selected:any = 0;
  editItem(itemUpdate:any){
    this.temporaryUserItemList = this._todo.userItemList;
    this.temporaryUserItemList.item[this.selected] = itemUpdate.value;
    this._todo.updateTodo(this._todo.userItemList).subscribe((res)=>{
      console.log("Edit Successfull");
      this._todo.refreshTodoList();
      this.closebutton.nativeElement.click();
      this.resetTempUserList();
    })
  }

  deleteItem(index:any){
    if( confirm("Do you really want to delete the list item?") === true){
      this.temporaryUserItemList = this._todo.userItemList;
      this.temporaryUserItemList.item.splice(index,1);
      this._todo.updateTodo(this.temporaryUserItemList).subscribe((res)=>{
        console.log("Deleted Successfully");
        this._todo.refreshTodoList();
        this.resetTempUserList();
      });
    }
  }

  deleteUser(){
    this.temporaryUserItemList = this._todo.userItemList;
    console.log(this._todo.userItemList._id);
    if( confirm("Do you really want to delete your account? This will delete your Data") === true){
      this._user.deleteUser(this.temporaryUserItemList._id).subscribe((res) => {
        console.log("User deleted Successfully");
        this._todo.deleteTodo(this.temporaryUserItemList._id).subscribe((res => {
          console.log("User Data Has been Deleted");
          this.resetTempUserList();
        }))
        this._auth.validatedUser = false;
        this._auth.loggedInUser = "";
        this.router.navigate(['home']);
      })
    }
  }
  
}
