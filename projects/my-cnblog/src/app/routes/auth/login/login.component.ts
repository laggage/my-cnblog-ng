import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { AuthService } from '../../../core/Auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginStatus: {
    failed: boolean,
    successed: boolean,
    failedMsg: string,
    logging: boolean
  } = {
      failed: false,
      successed: false,
      failedMsg: '',
      logging: false
    };
  private loginCallback: string;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private userServ: UserService,
    private router: Router,
    private notifyServ: NzNotificationService,
    private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
    this.route.paramMap.subscribe(x => {

      this.loginCallback = x.get('callback');
      if (!environment.production) {
        console.log(`登录回调地址: ${this.loginCallback}`);
      }
    });
  }

  ngOnInit(): void {
  }

  login() {
    const userInfo = this.loginForm.getRawValue();
    this.loginStatus = {
      successed: false,
      failedMsg: '',
      failed: false,
      logging: true
    };
    this.authServ.login({
      userName: userInfo.userName as string,
      securePassword: userInfo.password,
      rememberMe: userInfo.rememberMe
    }).subscribe(
      res => {
        if (res instanceof HttpErrorResponse) {
          this.onLoginFailed(res);
        } else {
          this.onLoginSuccessed();
        }
      }
    );
    if (!environment.production) {
      console.log(userInfo);
    }
  }

  onLoginFailed(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    this.loginStatus.failed = true;
    this.loginStatus.failedMsg = `${errorResponse.message}, ${errorResponse.status}, ${errorResponse.statusText}\r\n${errorResponse.error}`;
  }

  onLoginSuccessed() {
    this.userServ.getUser();
    this.router.navigateByUrl(this.loginCallback || this.loginCallback === '.' ? '/' : this.loginCallback);
    const s = this.userServ.userObserver.subscribe(
      o => {
        if (o instanceof HttpErrorResponse) { // Failed login
          console.log(o);
          this.loginStatus = {
            failed: true,
            successed: false,
            failedMsg: `Failed to get your profile ${o.message}, ${o.status}, ${o.statusText}\r\n${JSON.stringify(o.error)}`,
            logging: false
          };
          this.notifyServ.error('Failed to get user info', '');
        } else if (o != null) {
          this.notifyServ.success(`Successed login as ${o.userName}`, '');
          this.loginStatus = {
            failed: false,
            successed: true,
            failedMsg: ``,
            logging: false
          };
          s.unsubscribe();
        }
    });
  }
}
