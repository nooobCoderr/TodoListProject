import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RegisterUserComponent } from './register-user/register-user.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './Shared/login.guard';

const appRoutes:Routes=[
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'todoList', component: TodoListComponent, canActivate: [LoginGuard]},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    RegisterUserComponent,
    TodoListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
