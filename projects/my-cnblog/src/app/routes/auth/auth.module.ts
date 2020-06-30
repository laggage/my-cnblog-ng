import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ForbidenPageComponent } from './forbiden-page/forbiden-page.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForbidenPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
