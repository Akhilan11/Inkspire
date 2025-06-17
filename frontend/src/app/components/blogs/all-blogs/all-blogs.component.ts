import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent implements OnInit {

  blogs : any[] = []

  constructor(private blogService : BlogService, private router : Router){}

  ngOnInit()  {
    this.blogService.getAllBlogs().subscribe({
      next : (blog) => {
        this.blogs = blog
      }, error : (err) => {
        console.error('Error fetching blogs:', err);
      } 
    })
  }

  blogDetail(id : string) {
    this.router.navigate(['/blog',id])
  }

}

