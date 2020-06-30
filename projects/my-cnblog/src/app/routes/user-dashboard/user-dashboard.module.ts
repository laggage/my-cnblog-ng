import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDashboardComponent } from './blog-dashboard/blog-dashboard.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ModifyPostComponent } from './modify-post/modify-post.component';
import { SharedModule } from '../../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';



@NgModule({
  declarations: [BlogDashboardComponent, PostEditorComponent, NewPostComponent, ModifyPostComponent, PostListComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserDashboardModule { }
