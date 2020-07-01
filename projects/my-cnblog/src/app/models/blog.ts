import { BaseModel } from './base-model';
import { BlogUser } from './blog-user';

export class Blog extends BaseModel {
    isOpened: boolean;
    sign: string;
    blogger: BlogUser;
    openDate: Date;
    totalPostsCount: number;
    totalCommentsCount: number;
    totalPostedCommentsCount = 0;
}
