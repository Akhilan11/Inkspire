import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { UserService } from '../../../services/auth/user.service';

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrl: './user-blog.component.css'
})
export class UserBlogComponent implements OnInit {

  user: any = {};
  myBlogs: any[] = [];

  constructor(private userService : UserService, private blogService : BlogService) {}

  ngOnInit(): void {
    // Get user profile
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: () => {
        console.error('Failed to load user info');
      }
    });

    // Get user's blogs
    this.blogService.getMyBlogs().subscribe({
      next: (res: any) => {
        this.myBlogs = res;
      },
      error: (err) => {
        console.error('Failed to load your blogs', err);
      }
    });
  }
}