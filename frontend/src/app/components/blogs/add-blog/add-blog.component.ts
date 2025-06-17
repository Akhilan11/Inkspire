import { Component } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  blog = { title: '', content: '', author: ''};

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit(): void {
    this.blogService.createBlog(this.blog).subscribe({
      next: () => {
        alert('Blog added successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding blog:', err);
      }
    });
  }
  
}
