import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UserServiceService} from "../Services/user-service.service";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email: any = "";
  username: any = "";
  first_name: any = "";
  last_name: any = "";
  password: any = "";
  info: any = "";

  constructor(private userService: UserServiceService, public router: Router) {
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
  passwordRegex: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  posts: any[] = [];

  register() {
    this.userService.register(this.email, this.password, this.username, this.first_name, this.last_name).subscribe((posts) => {
      this.posts = posts;
      if(posts['validator']=="true"){
        alert("Register of user successful");

      }
    });
  }


}
