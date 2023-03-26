import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './auth.interceptor';
import { QouteComponent } from './qoute/qoute.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from '@angular/material/card';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAgentComponent } from './user-agent/user-agent.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosComponent,
    TodoDetailsComponent,
    NavbarComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    QouteComponent,
    UserDetailsComponent,
    UserAgentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
