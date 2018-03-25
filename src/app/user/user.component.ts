import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../classes/user';
import { UserResponse } from '../classes/user-response';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  userResponse: UserResponse;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/user/list`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(
      (resp: UserResponse) => {
        if (resp.code === 0) {
          this.userResponse = resp;
          this.users = this.userResponse.users;
        } else {
          alert(resp.message);
        }
      },
      err => this.catchError(err)
    );
  }
  private catchError(err) {
    let msg = '';
    if (err instanceof HttpErrorResponse) {
      msg = `Http Error: ${err.status}, text: ${err.statusText}`;
    } else {
      msg = `Unknown error, text: ${err.message}`;
    }
    alert(msg);
    console.log(err);
  }
}
