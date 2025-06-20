import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url: string = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) {}

  // Get all blogs
  getAllBlogs(): Observable<any> {
    return this.http.get(this.url);
  }

  // Get blog by ID
  getBlogById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  // Create a blog
  createBlog(blog: any): Observable<any> {
    return this.http.post(this.url, blog);
  }

  // Update a blog
  updateBlog(id: string, blog: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, blog);
  }

  // Delete a blog
  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Get user blog
  getMyBlogs() : Observable<any>{
    return this.http.get<any[]>(this.url+'/myblogs');
  }
}
