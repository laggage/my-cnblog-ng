import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { BlogLayoutHeaderComponent } from './blog-layout-header/blog-layout-header.component';
import { BlogLayoutSidebarComponent } from './blog-layout-sidebar/blog-layout-sidebar.component';
import { BlogLayoutService } from './services/blog-layout.service';



@NgModule({
  declarations: [BlogLayoutComponent, BlogLayoutHeaderComponent, BlogLayoutSidebarComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    BlogLayoutService
  ]
})
export class BlogLayoutModule { }
