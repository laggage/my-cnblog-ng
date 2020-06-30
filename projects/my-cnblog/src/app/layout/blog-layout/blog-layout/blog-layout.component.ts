import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd, ActivationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BlogLayoutService } from '../services/blog-layout.service';

@Component({
  selector: 'blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.css']
})
export class BlogLayoutComponent implements OnInit {
  constructor(
    router: Router,
    private route: ActivatedRoute,
    blogServ: BlogLayoutService
  ) {
    router.events.pipe(
      filter(x => x instanceof ActivationEnd),
      map(x => x as ActivationEnd)
    ).subscribe(x => {
      const blogId = x.snapshot.paramMap.get('blogId');
      if (blogId) {
        // console.log('load blog');
        blogServ.loadBlog(Number.parseInt(blogId, null));
      }
    });
  }

  ngOnInit(): void {
  }
}
