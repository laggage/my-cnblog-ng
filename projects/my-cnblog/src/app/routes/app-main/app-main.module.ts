import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMainComponent } from './app-main/app-main.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [AppMainComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AppMainModule { }
