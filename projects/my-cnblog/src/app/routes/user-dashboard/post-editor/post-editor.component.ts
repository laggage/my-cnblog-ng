import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../models/post';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { Tag, Tags } from '../../../models/tag';
import { ConsoleLogger } from '../../../core/console-logger';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnChanges {
  @Input() post: Post;
  @Output() submitted = new EventEmitter<Post>();
  tags: Tags = [];
  postForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    content: ['', Validators.required],
    isPublic: [true],
    isTopMost: [false],
    topMostOrder: [0],
    tags: [[]]
  });
  markdownData = '';

  labelSpan = 2;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (key === 'post' && changes[key]) {
        if (changes[key].previousValue !== changes[key].currentValue) {
          this.post = changes[key].currentValue;
         // console.log(changes[key].currentValue);
          this.setFormValue();
         // console.log(key, this.post, changes[key].currentValue);
        }
      }
    }
  }

  onSubmit() {
    const formValue = this.postForm.getRawValue();
    formValue.tags = this.tags;
    formValue.content = this.markdownData;
    const post = Object.assign(new Post(), formValue);
    this.submitted.next(post);
    if (!environment.production) {
      console.log(formValue);
      console.log(post);
    }
  }

  addTag(tagName: string) {
    if (!tagName) {
      return;
    }
    this.tags.push(new Tag(tagName));
  }

  removeTag(tag: Tag) {
    if (!tag) {
      return;
    }
    const index = this.tags.findIndex(x => x.name === tag.name);
    this.tags.splice(index, 1);
  }

  private setFormValue() {
    this.postForm.patchValue({ title: this.post.title });

    this.postForm.patchValue({ description: this.post.description });

    this.markdownData = this.post.content;
    this.tags = this.post.tags;
    // console.log(this.post);

    this.postForm.patchValue({ isPublic: this.post.isPublic });
  }
}
