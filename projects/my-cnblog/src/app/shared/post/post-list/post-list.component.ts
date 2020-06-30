import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Posts } from '../../../models/post';
import { PaginationInfo } from '../../../models/pagination-info';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: Posts = [];
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Input() totalItemsCount = 0;
  @Output() pageChanged = new EventEmitter<PaginationInfo>();

  get showPagiantion() {
    return this.totalItemsCount > this.pageSize;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.onPageIndexChanged(1);
  }

  onPageIndexChanged(pageIndex: number) {
    this.pageChanged.emit({
      pageIndex,
      pageSize: this.pageSize
    });
  }

  onPageSizeChanged(pageSize: number) {
    this.pageChanged.emit({
      pageIndex: this.pageIndex,
      pageSize
    });
  }
}
