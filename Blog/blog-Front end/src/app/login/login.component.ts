import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../navbar/navbar.component";
import {UserServiceService} from "../Services/user-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: any = "";
  password: any = "";
  info:any="";

  constructor(private userService: UserServiceService,public router: Router) {
    if (localStorage.getItem('token')) {
      this.userService.getUser(localStorage.getItem('token')).subscribe((posts) => {
        this.info = posts['validator'];
        if(this.info=="true"){
          router.navigate(['/blogposts']);
        }
        else{
          localStorage.removeItem('token');
        }
      });


    }
  }

  ngOnInit(): void {

  }

  emailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  posts: any[] = [];

  loginData() {
    this.userService.login(this.email, this.password).subscribe((posts) => {
      this.posts = posts;
      if(posts['validator']=='true'){

        localStorage.setItem('token',posts['token']);
        this.router.navigate(['/blogposts']);
        alert("login Successful");

      }
    });
  }

}
