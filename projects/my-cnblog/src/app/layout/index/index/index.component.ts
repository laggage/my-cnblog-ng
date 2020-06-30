import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/Auth/auth.service';
import { UserService } from '../../../core/services/user.service';
import { BlogUser } from '../../../models/blog-user';
import { environment } from 'projects/my-cnblog/src/environments/environment';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user: BlogUser;
  private routeUrl = '/app/index';

  constructor(
    private authServ: AuthService,
    private userServ: UserService,
    router: Router) {
    router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map(x => x as NavigationEnd)
    ).subscribe(x => {
      if (!environment.production) {
        console.log(x);
      }
      if (x.urlAfterRedirects === this.routeUrl) {
        this.loadUser();
      }
    });
    this.userServ.userObserver.subscribe(
      x => {
        if (x instanceof BlogUser) {
          this.user = x;
        }
      }
    );
  }

  private loadUser() {
    this.userServ.getUser();
  }

  ngOnInit(): void {
  }
}
