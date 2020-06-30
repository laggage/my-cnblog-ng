import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostModule } from './post/post.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {
  NzIconModule,
  NzInputModule,
  NzButtonModule,
  NzFormModule,
  NzGridModule,
  NzCheckboxModule,
  NzPopoverModule,
  NzNotificationModule,
  NzCollapseModule,
  NzTypographyModule,
  NzRadioModule,
  NzDatePickerModule,
  NzStatisticModule,
  NzCardModule,
  NzCommentModule,
  NzListModule,
  NzAlertModule,
  NzResultModule,
  NzLayoutModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzTagModule,
  NzInputNumberModule,
  NzModalModule,
  NzSpinModule,
} from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from './markdown/markdown.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzAvatarModule
  ],
  exports: [
    RouterModule,
    PostModule,
    NzAvatarModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzNotificationModule,
    NzCollapseModule,
    NzTypographyModule,
    NzRadioModule,
    NzDatePickerModule,
    NzStatisticModule,
    NzCardModule,
    NzCommentModule,
    NzListModule,
    NzAlertModule,
    NzResultModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzCardModule,
    NzTagModule,
    MarkdownModule,
    NzInputNumberModule,
    NzModalModule,
    NzSpinModule
  ]
})
export class SharedModule { }
