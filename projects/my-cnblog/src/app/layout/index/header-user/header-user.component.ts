import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { BlogUser } from '../../../models/blog-user';

@Component({
  selector: 'layout-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  @Input() user: BlogUser;

  constructor(
    private authServ: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authServ.logout();
    window.location.reload();
  }
}
