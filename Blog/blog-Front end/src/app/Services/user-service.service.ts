import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  login(email: any, password: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5000/login',
      {
        username: email,
        password: password,
      },
      {headers}
    );
  }

  register(email: any, password: any, username: any, first_name: any, last_name: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5000/register',
      {
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name
      },
      {headers}
    );
  }

  displayBlogs() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5000/displayPost',{headers}
    );
  }


  logout(token:any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5000/logout',
      {token:token},{headers}
    );
  }

  getUser(token:any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<any>(
      'http://localhost:5000/getUser',
      {token:token},{headers}
    );
  }

}



