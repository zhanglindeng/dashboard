import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Log } from '../classes/log';
import { environment } from '../../environments/environment';
import { LogResponse } from '../classes/log-response';
import { Helper } from '../classes/helper';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  logs: Log[];
  count: number;
  currentPage: number;
  totalPage: number;
  logResponse: LogResponse;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.totalPage = 1;
    this.http.get(`${environment.apiUrl}/log`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(
      (logResponse: LogResponse) => {
        if (logResponse.code === 0) {
          this.logResponse = logResponse;
          this.logs = logResponse.logs;
          this.count = logResponse.count;
          this.currentPage = logResponse.current_page;
          this.totalPage = logResponse.total_page;
        } else {
          alert(logResponse.message);
        }
      },
      err => this.catchError(err)
    );
  }

  nexPage() {
    if (this.currentPage >= this.totalPage) {
      alert('这已经是最后一页');
      return;
    }
    this.http.get(`${environment.apiUrl}/log?page=${this.currentPage + 1}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(
      (logResponse: LogResponse) => {
        if (logResponse.code === 0) {
          this.logResponse = logResponse;
          this.logs = logResponse.logs;
          this.count = logResponse.count;
          this.currentPage = logResponse.current_page;
          this.totalPage = logResponse.total_page;
          Helper.mainScrollTop();
        } else {
          alert(logResponse.message);
        }
      },
      err => this.catchError(err)
    );
  }

  prevPage() {
    if (this.currentPage < 1) {
      return;
    }
    this.http.get(`${environment.apiUrl}/log?page=${this.currentPage - 1}`, {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }).subscribe(
      (logResponse: LogResponse) => {
        if (logResponse.code === 0) {
          this.logResponse = logResponse;
          this.logs = logResponse.logs;
          this.count = logResponse.count;
          this.currentPage = logResponse.current_page;
          this.totalPage = logResponse.total_page;
          Helper.mainScrollTop();
        } else {
          alert(logResponse.message);
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
