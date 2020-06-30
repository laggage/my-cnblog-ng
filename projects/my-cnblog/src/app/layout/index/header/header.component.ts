import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { BlogUser } from '../../../models/blog-user';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Blog';
  @Input()user: BlogUser;

  constructor() { }

  ngOnInit(): void {
  }

}
