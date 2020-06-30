import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';



@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MarkdownEditorComponent
  ]
})
export class MarkdownModule { }
