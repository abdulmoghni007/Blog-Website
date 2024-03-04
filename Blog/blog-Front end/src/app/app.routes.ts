import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BlogsComponent} from "./blogs/blogs.component";
import {PostComponent} from "./post/post.component";

export const routes: Routes = [
  {
    'path': 'login', component: LoginComponent
  },

  {
    'path': 'register', component: RegisterComponent
  },

  {
    'path': '', component: BlogsComponent
  },

  {
    'path': 'blogposts', component: PostComponent
  },

];
