import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {UserServiceService} from "../Services/user-service.service";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  posts: any[] = [];
  info: any;

  constructor(private userService: UserServiceService, public router: Router) {
    if (localStorage.getItem('token')) {
      this.userService.getUser(localStorage.getItem('token')).subscribe((posts) => {
        this.info = posts['validator'];
        if (this.info == "true") {
          router.navigate(['/blogposts']);
        } else {
          localStorage.removeItem('token');
        }
      });


    }
    this.userService.displayBlogs().subscribe((posts) => {
      this.posts = posts['Posts'];
      console.log(this.posts[2]);
    });
  }

  ngOnInit(): void {

  }

}
