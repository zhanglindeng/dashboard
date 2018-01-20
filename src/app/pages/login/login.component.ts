import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  passwordEmpty = false;
  emailEmpty = false;
  requesting = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    // email
    if (this.email.length === 0) {
      this.emailEmpty = true;
      return;
    }
    this.emailEmpty = false;

    // password
    if (this.password.length === 0) {
      this.passwordEmpty = true;
      return;
    }
    this.passwordEmpty = false;

    // http request
    this.requesting = true;

    this.http.post(`${environment.apiUrl}/login`, {
      email: this.email,
      password: this.password,
    }).subscribe(
      data => {
        console.log(data);
        this.requesting = false;
      },
      err => {
        alert(err.statusText);
        this.requesting = false;
      }
    );
  }

}
