import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { AppMainModule } from './app-main/app-main.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';


@NgModule({
  declarations: [
  PageNotFoundComponent],
  imports: [
    CommonModule,
    AppMainModule,
    SharedModule,
    AuthModule
  ],
  exports: [
    RoutesRoutingModule,
    AppMainModule,
    AuthModule,
    BlogModule,
    UserDashboardModule
  ]
})
export class RoutesModule { }
