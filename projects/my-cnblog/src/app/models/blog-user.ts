import { BaseModel } from './base-model';
import { Sex } from './sex.enum';
import { Blog } from './blog';

export class BlogUser extends BaseModel {
    id: number;
    userName: string;
    email: string;
    sex: Sex;
    birth?: Date;
    registerDate: Date;
    avatarUrl: string;
    isDeleted: boolean;
    blog: Blog;
}
