import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from '../../../core/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', []],
    sex: ['', []],
    birth: [Date.now(), []],
    avatar: ['', []]
  });
  avatarFile: File;
  avatarImageUrl: any;

  registering = false;
  successed = false;
  failed = false;
  failedMas = '';

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService,
    private router: Router,
    private notifyServ: NzNotificationService,
  ) { }

  ngOnInit(): void {
  }

  fileChanged(event: any) {
    if (event.srcElement.files.length > 0) {
      this.avatarFile = event.srcElement.files[0];
      console.log(this.avatarFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.avatarFile);
      reader.onload = () => {
        this.avatarImageUrl = reader.result;
      };
    } else {
      this.avatarFile = null;
      this.avatarImageUrl = null;
    }
  }

  onSubmit() {
    this.registering = true;
    this.successed = false;
    this.failed = false;
    this.failedMas = '';

    const registerModel = this.registerForm.getRawValue();
    this.authServ.register({
      userName: registerModel.userName,
      securePassword: registerModel.password,
      email: registerModel.email,
      birth: registerModel.birth,
      avatar: this.avatarFile
    }).subscribe(
      o => {
        if (o instanceof HttpErrorResponse) {
          this.failed = true;
          this.successed = false;
          this.failedMas = `Register failed ${o.message}\r\n ${o.statusText} \r\n ${o.status} \r\n
          ${JSON.stringify(o.headers, [], 2)} ${JSON.stringify(o.error)}`;
        } else if (o != null) {
          this.failed = false;
          this.successed = true;
          this.notifyServ.success('注册成功, 为你跳转到登录页', '');
          this.router.navigateByUrl('/app/login');
        } else {
          this.failed = true;
          this.failedMas = `Register failed, and the reason is unknown`;
          this.successed = false;
        }
      }
    );
  }
}
