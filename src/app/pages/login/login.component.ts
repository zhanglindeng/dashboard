import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ResponseData } from '../../classes/response-data';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

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
  respData: ResponseData;

  constructor(private http: HttpClient, private router: Router) {
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

    this.http.post<ResponseData>(`${environment.apiUrl}/user/login`, {
      email: this.email,
      password: this.password,
    }).map(data => new ResponseData(data)).subscribe(
      respData => {
        this.respData = respData;
        this.requesting = false;
        this.isLoginOk();
      },
      err => {
        alert(err.statusText);
        this.requesting = false;
      }
    );
  }

  isLoginOk() {
    if (this.respData.code === 0) {
      sessionStorage.setItem('token', this.respData.token);
      this.router.navigateByUrl('/home');
    } else {
      alert(this.respData.message);
    }
  }

}
