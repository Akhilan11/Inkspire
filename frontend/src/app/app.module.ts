import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AllBlogsComponent } from './components/blogs/all-blogs/all-blogs.component';
import { GetBlogComponent } from './components/blogs/get-blog/get-blog.component';
import { AddBlogComponent } from './components/blogs/add-blog/add-blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserBlogComponent } from './components/blogs/user-blog/user-blog.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AllBlogsComponent,
    GetBlogComponent,
    AddBlogComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserBlogComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
