import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { MarkdownModule as NgxMarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.link = (href: string, title: string, text: string) => {
    return `<a href="${href}" target="_blank"> ${text} </a>`;
  };

  return {
    renderer,
    gfm: true,
    // tables: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true
  };
}

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [
    CommonModule,
    NgxMarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      },
      sanitize: SecurityContext.NONE,
    }),
  ],
  exports: [
    MarkdownEditorComponent,
    NgxMarkdownModule,
  ]
})
export class MarkdownModule { }
