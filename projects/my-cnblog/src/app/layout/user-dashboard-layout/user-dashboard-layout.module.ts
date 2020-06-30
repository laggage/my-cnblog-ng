import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardLayoutComponent } from './user-dashboard-layout/user-dashboard-layout.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [UserDashboardLayoutComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UserDashboardLayoutModule { }
