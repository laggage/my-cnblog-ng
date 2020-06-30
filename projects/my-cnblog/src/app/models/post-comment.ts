import { BaseModel } from './base-model';
import { Post } from './post';
import { BlogUser } from './blog-user';

export type PostComments = PostComment[];

export class PostComment extends BaseModel {
    public postedTime: Date;
    public repliedPost: Post;
    public repliedPostId: number;
    public repliedComment: Post;
    public repliedCount: number;
    public user: BlogUser;
    public comment: string;
}
