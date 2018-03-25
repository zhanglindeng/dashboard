import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserAddResponse } from '../../classes/user-add-response';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  requesting = false;
  user = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  empty = {
    name: false,
    email: false,
    password: false,
    password2: false,
  };
  password2Error = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  add() {
    // requesting
    if (this.requesting) {
      console.log('requesting');
      return;
    }

    // name
    if (this.user.name.length === 0) {
      this.empty.name = true;
      return;
    }
    this.empty.name = false;

    // email
    if (this.user.email.length === 0) {
      this.empty.email = true;
      return;
    }
    this.empty.email = false;

    // password
    if (this.user.password.length === 0) {
      this.empty.password = true;
      return;
    }
    this.empty.password = false;

    // password2
    if (this.user.password2.length === 0) {
      this.empty.password2 = true;
      return;
    }
    this.empty.password2 = false;

    // password == password2
    if (this.user.password !== this.user.password2) {
      this.password2Error = true;
      return;
    }
    this.password2Error = false;

    // http requesting
    this.requesting = true;

    this.http.post(`${environment.apiUrl}/user/add`, {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
    }).subscribe(
      (resp: UserAddResponse) => {
        this.requesting = false;
        if (resp.code === 0) {
          alert('添加用户成功');
        } else {
          alert('添加用户失败：' + resp.message);
        }
      },
      err => {
        alert(err.statusText);
        this.requesting = false;
      }
    );
  }
}
