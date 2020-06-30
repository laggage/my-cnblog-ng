import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { IndexComponent } from './index/index.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    IndexComponent,
    HeaderUserComponent,
    FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    HeaderComponent,
    HeaderUserComponent,
    IndexComponent,
    FooterComponent
  ]
})
export class IndexModule { }
