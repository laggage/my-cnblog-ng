import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post';
import { DateHelperByDateFns } from 'ng-zorro-antd/i18n';
import { PostService } from '../../../core/services/post.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;

  constructor(
    private postServ: PostService,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.post.lastModified = new Date(this.post.lastModified);
    this.post.createDate = new Date(this.post.createDate);
  }

  get postCreateDate() {
    return this.post.createDate;
  }

  get postLastModified() {
    return this.post.lastModified;
  }

  get showLastModified() {
    return !(this.postCreateDate.getFullYear() === this.postLastModified.getFullYear() &&
      this.postCreateDate.getMonth() === this.postLastModified.getMonth() &&
      this.postCreateDate.getDay() === this.postLastModified.getDay() &&
      this.postCreateDate.getHours() === this.postLastModified.getHours());
  }

  randomTagColor() {
    const colorMap = ['magenta', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'geekblue'];
    return colorMap[Math.floor((Math.random() * (colorMap.length - 1)))];
  }

  async onGotoPostDetail() {
    await this.route.navigateByUrl(`/blog/${this.post.blog.id}/posts/${this.post.id}?fromApp=true`);
    this.postServ.selectedPostSubject.next(this.post);
  }
}
