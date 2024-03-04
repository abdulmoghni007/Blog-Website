import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserServiceService} from "../Services/user-service.service";

@Component({
  selector: 'app-navbar-second',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar-second.component.html',
  styleUrl: './navbar-second.component.css'
})
export class NavbarSecondComponent implements OnInit {


  token: any = localStorage.getItem('token');
  posts: any[] = [];
  username:any;

  constructor(private userService: UserServiceService,public router: Router) {
    if (localStorage.getItem('token')) {
      this.userService.getUser(localStorage.getItem('token')).subscribe((posts) => {
        this.username = posts['message'];


      });
    }
  }

  ngOnInit(): void {

  }

  logout() {
    this.userService.logout(this.token).subscribe((posts) => {
      this.posts = posts;



    });

    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }
}
