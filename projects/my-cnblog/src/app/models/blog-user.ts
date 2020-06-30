import { BaseModel } from './base-model';
import { Sex } from './sex.enum';
import { Blog } from './blog';

export class BlogUser extends BaseModel {
    id: number;
    public userName: string;
    public email: string;
    public sex: Sex;
    public birth: Date;
    public registerDate: Date;
    public avatarUrl: string;
    public isDeleted: boolean;
    public blog: Blog;
}
