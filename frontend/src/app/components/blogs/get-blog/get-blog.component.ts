import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-blog',
  templateUrl: './get-blog.component.html',
  styleUrls: ['./get-blog.component.css']
})
export class GetBlogComponent implements OnInit {
  blog: any;
  isEditing: boolean = false;
  editedBlog: any = {};

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogById(id).subscribe({
        next: (res) => {
          this.blog = res;
          this.editedBlog = { ...res }; // make a copy for editing
        },
        error: (err) => console.error(err)
      });
    }
  }

  edit(): void {
    this.isEditing = true;
  }

  cancel(): void {
    this.isEditing = false;
    this.editedBlog = { ...this.blog }; // reset changes
  }

  updateBlog(): void {
    this.blogService.updateBlog(this.blog._id, this.editedBlog).subscribe({
      next: (res) => {
        this.blog = res.blog;
        this.isEditing = false;
      },
      error: (err) => console.error('Update failed:', err)
    });
  }

  deleteBlog(): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(this.blog._id).subscribe({
        next: () => {
          alert('Blog deleted');
          this.router.navigate(['/']); // go back to all blogs
        },
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }
}
