import { BlogUser } from './blog-user';
import { BaseModel } from './base-model';
import { Tags } from './tag';
import { Blog } from './blog';

export type Posts = Post[];

export class Post extends BaseModel {
    title: string;
    lastModified: Date;
    createDate: Date;
    isTopMost: boolean;
    topMostOrder: number;
    tags: Tags;
    postContentUrl: string;
    description: string;
    viewCount: number;
    commentsCount: number;
    blog: Blog;
    content = '';
    isPublic = true;
    isDeleting = false;

    get author(): BlogUser {
        return this.blog.blogger;
    }

    assignToAddDto() {
        return {
            title: this.title,
            content: this.content,
            description: this.description,
            topMostOrder: this.topMostOrder,
            isPublic: this.isPublic,
            tags: this.tags.map(x => x.assignToAddDto()),
            isTopMost: this.isTopMost
        };
    }
}
