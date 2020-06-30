import { environment } from '../../environments/environment';

export class ConsoleLogger {
    static canLog() {
        return !environment.production;
    }

    static error(err: any) {
        if (this.canLog()) {
            console.log(err);
        }
    }

    static log(msg1: any, msg2?: any) {
        if (this.canLog()) {
            console.log(msg1, msg2);
        }
    }
}
