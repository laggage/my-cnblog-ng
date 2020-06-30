import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { SharedModule } from '../shared/shared.module';
import { IndexModule } from './index/index.module';
import { BlogLayoutModule } from './blog-layout/blog-layout.module';
import { UserDashboardLayoutModule } from './user-dashboard-layout/user-dashboard-layout.module';

@NgModule({
  declarations: [FullscreenComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FullscreenComponent,
    IndexModule,
    BlogLayoutModule,
    UserDashboardLayoutModule
  ]
})
export class LayoutModule { }
