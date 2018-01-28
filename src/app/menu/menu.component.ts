import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, MenuResponse, MenusResponse } from '../classes/menu';
import { environment } from '../../environments/environment';

// import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menus: Menu[];
  requesting = false;

  // add menu
  add_menu_view_show = false;
  newMenu: Menu;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // init new menu
    this.newMenu = new Menu();
    this.newMenu.name = '';
    this.newMenu.name_en = '';
    this.newMenu.icon = '';
    this.newMenu.remark = '';
    this.newMenu.sort = 0;

    this.http.get(`${environment.apiUrl}/menu`).subscribe(
      (data: MenusResponse) => {
        if (data.code === 0) {
          this.menus = data.menus;
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

  add() {
    this.add_menu_view_show = true;
  }

  addOk() {
    this.requesting = true;
    this.http.post(`${environment.apiUrl}/menu/add`, {
      name: this.newMenu.name,
      name_en: this.newMenu.name_en,
      icon: this.newMenu.icon,
      sort: this.newMenu.sort,
      remark: this.newMenu.remark,
    }, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: MenuResponse) => {
        this.requesting = false;
        if (data.code === 0) {
          alert('添加菜单成功');
          this.add_menu_view_show = false;
        } else {
          alert(data.message);
        }
      },
      err => {
        this.requesting = false;
        console.log(err);
        alert(err.message || 'Unknown error');
      }
    );
  }

  addNo() {
    this.add_menu_view_show = false;
  }
}
