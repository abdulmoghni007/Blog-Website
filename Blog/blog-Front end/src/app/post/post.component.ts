import {Component, OnInit} from '@angular/core';
import {NavbarSecondComponent} from "../navbar-second/navbar-second.component";
import {UserServiceService} from "../Services/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NavbarSecondComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
info:any;
  constructor(private userService: UserServiceService,public router: Router){
    if (localStorage.getItem('token')) {
      this.userService.getUser(localStorage.getItem('token')).subscribe((posts) => {
        this.info = posts['validator'];
        if (this.info != "true") {
          router.navigate(['/login']);
        }

      });
    }
    if(!localStorage.getItem('token')){
      router.navigate(['/login']);
    }

  }

  ngOnInit(): void {

  }

}
