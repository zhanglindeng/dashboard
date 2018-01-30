import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { Menu, MenusResponse, Submenu } from '../../classes/menu';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  menus: Menu[];
  currentMenu: Menu;
  currentSubmenu: Submenu;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/menu`).subscribe(
      (data: MenusResponse) => {
        if (data.code === 0) {
          this.menus = data.menus;
          this.currentMenu = this.menus[0];
        } else {
          alert(data.message);
        }
      },
      err => {
        console.log(err);
        alert(err.message || 'Unknown error');
      }
    );
  }

  menuClick(m: Menu) {
    this.currentMenu = m;
  }

  menuMouseenter(m: Menu) {
    this.currentMenu = m;
  }
}
