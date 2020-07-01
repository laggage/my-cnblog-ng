import { BaseModel } from './base-model';
import { Sex } from './sex.enum';
import { Blog } from './blog';
import { environment } from '../../environments/environment';

export class BlogUser extends BaseModel {
    id: number;
    userName: string;
    email: string;
    sex: Sex;
    birth?: Date;
    registerDate: Date;
    isDeleted: boolean;
    blog: Blog;

    // tslint:disable-next-line:variable-name
    private _avatarUrl: string;
    get avatarUrl() {
        return this._avatarUrl;
    }

    set avatarUrl(url: string) {
        this._avatarUrl = url.replace(/http:\/\/localhost:\d*/, `${environment.apiBaseUrl}`);
    }
}
