import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';
import { Post } from '../../models/post';
import { PostListComponent } from './post-list/post-list.component';
import { NzTypographyModule, NzAvatarModule, NzPaginationModule, NzGridModule, NzTagModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [PostItemComponent, PostListComponent],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzTypographyModule,
    RouterModule,
    NzPaginationModule,
    NzGridModule,
    NzTagModule
  ],
  exports: [
    PostItemComponent, PostListComponent, NzPaginationModule,
  ]
})
export class PostModule {

  constructor() {
  }
}
