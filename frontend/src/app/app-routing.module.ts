import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// blogs
import { GetBlogComponent } from './components/blogs/get-blog/get-blog.component';
import { AllBlogsComponent } from './components/blogs/all-blogs/all-blogs.component';
import { AddBlogComponent } from './components/blogs/add-blog/add-blog.component';

// auth
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
  { path: '', component: AllBlogsComponent }, 
  { path: 'blog/create', component: AddBlogComponent },
  { path: 'blog/:id', component: GetBlogComponent }, 
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
