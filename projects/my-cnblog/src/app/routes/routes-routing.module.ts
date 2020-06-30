import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from '../layout/index/index/index.component';
import { AppMainComponent } from './app-main/app-main/app-main.component';
import { LoginComponent } from './auth/login/login.component';
import { BlogLayoutComponent } from '../layout/blog-layout/blog-layout/blog-layout.component';
import { PostReadComponent } from './blog/post-read/post-read.component';
import { PostsComponent } from './blog/posts/posts.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserDashboardLayoutComponent } from '../layout/user-dashboard-layout/user-dashboard-layout/user-dashboard-layout.component';
import { AuthGuard } from '../core/Auth/auth.guard';
import { BlogDashboardComponent } from './user-dashboard/blog-dashboard/blog-dashboard.component';
import { NewPostComponent } from './user-dashboard/new-post/new-post.component';
import { ModifyPostComponent } from './user-dashboard/modify-post/modify-post.component';
import { CanDeactivateGuard } from '../core/guard/can-deactivate.guard';
import { ForbidenPageComponent } from './auth/forbiden-page/forbiden-page.component';
import { PostListComponent } from './user-dashboard/post-list/post-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'app/index', pathMatch: 'full' },
  { path: '401', redirectTo: 'app.login' },
  { path: '403', component: ForbidenPageComponent },
  {
    path: 'app',
    component: IndexComponent,
    children: [
      {
        path: 'index',
        component: AppMainComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: 'blog',
    component: BlogLayoutComponent,
    children: [
      {
        path: ':blogId/posts',
        component: PostsComponent
      },
      {
        path: ':blogId/posts/:postId',
        component: PostReadComponent
      }
    ]
    // component:
  },
  { path: 'userCenter', redirectTo: 'userCenter/dashboard', pathMatch: 'full' },
  {
    path: 'userCenter',
    component: UserDashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: BlogDashboardComponent
      },
      {
        path: 'post/write',
        component: NewPostComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'post/:postId/modify',
        component: ModifyPostComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'post/modify',
        component: ModifyPostComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'posts',
        component: PostListComponent
      }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: []
})
export class RoutesRoutingModule { }
