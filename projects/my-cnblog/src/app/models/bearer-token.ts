import { Base64 } from 'js-base64';
export class BearerToken {
    // tslint:disable-next-line:variable-name
    expires_at: string;
    // tslint:disable-next-line:variable-name
    auth_time: string;
    sid: number;
    // tslint:disable-next-line:variable-name
    access_token: string;

    get expired(): boolean {
        try {
            const token: {
                exp: number,
                iat: number
            } = JSON.parse(Base64.decode(this.access_token));
            return token.exp - token.iat < 0;
        } catch {
            return false;
        }

    }
}
