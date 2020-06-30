import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { EditorMdConfig } from '../editormd/editormd-config';

type EditorStatus = 'preview' | 'input';
declare var editormd: any;

@Component({
  selector: 'md-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.css']
})
export class MarkdownEditorComponent implements OnInit, OnChanges {
  editorStatus: EditorStatus = 'input';

  @Input() markdownData: string;
  @Input() height: string | number = 640;
  @Output() markdownDataChange = new EventEmitter<string>();
  @Input() toolbarIcons: string[];

  // tslint:disable-next-line:variable-name
  private _editor: any;
  // tslint:disable-next-line:variable-name
  private _isEditorLoaded = false;
  // tslint:disable-next-line:variable-name
  private _markdownDataChangeFromOuter = true; // 指示改变是否来自外部输入
  constructor() {
   }

  ngOnInit(): void {
    this.buildEditormd();
  }

  getMarkdown(): string {
    return this._editor.getMarkdown();
  }

  closePreview() {
    this.editorStatus = 'input';
  }

  private buildEditormd() {
    // 构造markdown editor
    this._editor = editormd(
      'markdown-content',
      new EditorMdConfig({
        height: this.height,
        watch: false,
        coldFold: false,
        markdown: this.markdownData,
        toolbarIcons: this.toolbarIcons ? this.toolbarIcons : [
          'undo', 'redo', '|',
          'bold', 'del', 'italic', 'quote', 'uppercase', 'lowercase', '|',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', '|',
          'list-ul', 'list-ol', 'hr', '|',
          'customPreview'
        ],
        toolbarIconsClass: {
          customPreview: 'fa-eye-slash'
        },
        toolbarHandlers: {
          customPreview: () => {
            this.previewMarkdown();
          }
        },
        lang: {
          name: 'zh-cn',
          toolbar: {
            customPreview: '预览'
          }
        },
        onload: () => {
          this._isEditorLoaded = true;

          this._editor.cm.on('change', () => {
            this._markdownDataChangeFromOuter = false;
            this.markdownDataChange.emit(this.getMarkdown());
          });

          if (this.markdownData && this.markdownData.length > 0) {
            this._editor.setValue(this.markdownData);
          }
        }
      }));
  }

  ngOnChanges(changes: { [propkey: string]: SimpleChange }): void {
    for (const key in changes) {
      if (key === 'markdownData' &&
        this._editor &&
        this._isEditorLoaded &&
        changes[key].currentValue &&
        changes[key].currentValue.length > 0) {
          if (this._markdownDataChangeFromOuter) {
            const cursor = this._editor.getCursor(); // 光标位置缓存
            this._editor.setValue(changes[key].currentValue); // 这个方法会导致光标位置发生变化
            this._editor.setCursor(cursor); // 恢复到之前缓存的光标位置
          } else {
            this._markdownDataChangeFromOuter = true;
          }
      } // end if
    } // end for
  }

  private previewMarkdown() {
    this.editorStatus = 'preview';
  }
}
