import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbiden-page',
  template: `
  <nz-result nzStatus="403" nzTitle="403" nzSubTitle="抱歉, 你无权访问此页面.">
      <div nz-result-extra>
        <button nz-button routerLink="/app/index">MainPage</button>
      </div>
    </nz-result>
    `,
})
export class ForbidenPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
