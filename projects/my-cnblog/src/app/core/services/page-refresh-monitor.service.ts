import { Injectable } from '@angular/core';

const unloadDataStampSaveKey = 'MyCNBlog_ExitData';

/**
 * 退出时的'数据戳'
 */
class UnloadDataStamp {
  exitTime: number = Date.now();
  constructor(
    public data?: any
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class PageRefreshMonitorService {
  private data: any = {};
  // tslint:disable-next-line:variable-name
  private _isPageRefreshed?: boolean = undefined;

  constructor() {
    window.onunload = () => {
      this.onWindowUnloaed();
    };
    this.isPageRefreshed();
  }

  appendData(key: string, item: any) {
    this.data[key] = item;
  }

  getData(key: string) {
    return this.data[key];
  }

  isPageRefreshed() {
    const dataStamp = Object.assign(new UnloadDataStamp(), JSON.parse(window.localStorage.getItem(unloadDataStampSaveKey)));
    if (this._isPageRefreshed === undefined) {
      if ((Date.now() - dataStamp.exitTime) / 1000 < 5) {
        this._isPageRefreshed = true;
        this.data = dataStamp.data;
      } else {
        this._isPageRefreshed = false;
      }
    }
    return this._isPageRefreshed;
  }

  private onWindowUnloaed() {
    window.localStorage.setItem(unloadDataStampSaveKey, JSON.stringify(new UnloadDataStamp(this.data)));
  }
}
