import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddSubmenuResponse, Menu, MenuResponse, MenusResponse, Submenu } from '../classes/menu';
import { environment } from '../../environments/environment';
import { BaseResponse } from '../classes/response';

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
  add_submenu_view_show = false;
  newMenu: Menu;
  newSubmenu: Submenu;
  currentAddMenu: Menu;
  editingMenu: Menu;
  edit_menu_view_show = false;
  editingSubmenu: Submenu;
  edit_submenu_view_show = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // init new menu
    this.newMenu = new Menu();
    this.newMenu.name = '';
    this.newMenu.name_en = '';
    this.newMenu.icon = '';
    this.newMenu.remark = '';
    this.newMenu.sort = 100;

    // init add new submenu
    this.newSubmenu = new Submenu();
    this.newSubmenu.name = '';
    this.newSubmenu.link = '';
    this.newSubmenu.sort = 100;
    this.newSubmenu.menu_id = 0;

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
          this.add_menu_view_show = false;
          alert('添加菜单成功');
          location.reload();
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

  disable(m: Menu) {
    this.http.post(`${environment.apiUrl}/menu/disable/${m.id}`, null, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: BaseResponse) => {
        if (data.code === 0) {
          m.status = 0;
        } else {
          alert(data.message);
        }
      },
      err => {
        alert(err.message || 'unknown error');
      }
    );
  }

  enable(m: Menu) {
    this.http.post(`${environment.apiUrl}/menu/enable/${m.id}`, null, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: BaseResponse) => {
        if (data.code === 0) {
          m.status = 1;
        } else {
          alert(data.message);
        }
      },
      err => {
        alert(err.message || 'unknown error');
      }
    );
  }

  del(m: Menu) {
    const index = this.menus.indexOf(m, 0);
    if (index > -1) {
      this.http.post(`${environment.apiUrl}/menu/del/${m.id}`, null, {
        headers: {'Authorization': sessionStorage.getItem('token')}
      }).subscribe(
        (data: BaseResponse) => {
          if (data.code === 0) {
            this.menus.splice(index, 1);
          } else {
            alert(data.message);
          }
        },
        err => {
          alert(err.message || 'unknown error');
        }
      );
    }
  }

  addSubmenu(m: Menu) {
    this.currentAddMenu = m;
    this.add_submenu_view_show = true;
  }

  addSubmenuNo() {
    this.add_submenu_view_show = false;
  }

  addSubmenuOk() {
    this.newSubmenu.menu_id = this.currentAddMenu.id;
    this.http.post(`${environment.apiUrl}/menu/add/${this.currentAddMenu.id}/submenu`, {
      name: this.newSubmenu.name,
      link: this.newSubmenu.link,
      sort: this.newSubmenu.sort,
    }, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: AddSubmenuResponse) => {
        if (data.code === 0) {
          this.add_submenu_view_show = false;
          alert('添加子菜单成功');
          location.reload();
        } else {
          alert(data.message);
        }
      },
      err => {
        alert(err.message || 'unknown error');
      }
    );
  }

  delSubmenu(m: Menu, s: Submenu) {
    const index = m.submenus.indexOf(s, 0);
    if (index > -1) {
      this.http.post(`${environment.apiUrl}/menu/del/${m.id}/submenu/${s.id}`, null, {
        headers: {'Authorization': sessionStorage.getItem('token')}
      }).subscribe(
        (data: BaseResponse) => {
          if (data.code === 0) {
            m.submenus.splice(index, 1);
          } else {
            alert(data.message);
          }
        },
        err => {
          alert(err.message || 'unknown error');
        }
      );
    }
  }

  disableSubmenu(m: Menu, s: Submenu) {
    this.http.post(`${environment.apiUrl}/menu/disable/${m.id}/submenu/${s.id}`, null, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: BaseResponse) => {
        if (data.code === 0) {
          s.status = 0;
        } else {
          alert(data.message);
        }
      },
      err => {
        alert(err.message || 'unknown error');
      }
    );
  }

  enableSubmenu(m: Menu, s: Submenu) {
    this.http.post(`${environment.apiUrl}/menu/enable/${m.id}/submenu/${s.id}`, null, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: BaseResponse) => {
        if (data.code === 0) {
          s.status = 1;
        } else {
          alert(data.message);
        }
      },
      err => {
        alert(err.message || 'unknown error');
      }
    );
  }

  edit(m: Menu) {
    this.editingMenu = m;
    this.edit_menu_view_show = true;
  }

  editNo() {
    this.edit_menu_view_show = false;
  }

  editOk() {
    this.requesting = true;
    this.http.post(`${environment.apiUrl}/menu/update/${this.editingMenu.id}`, {
      name: this.editingMenu.name,
      name_en: this.editingMenu.name_en,
      icon: this.editingMenu.icon,
      sort: this.editingMenu.sort,
      remark: this.editingMenu.remark,
    }, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: MenuResponse) => {
        this.requesting = false;
        if (data.code === 0) {
          this.edit_menu_view_show = false;
          alert('编辑菜单成功');
          location.reload();
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

  editSubmenu(m: Menu, s: Submenu) {
    this.editingMenu = m;
    this.editingSubmenu = s;
    this.edit_submenu_view_show = true;
  }

  editSubmenuOk() {
    this.requesting = true;
    this.http.post(`${environment.apiUrl}/menu/update/${this.editingMenu.id}/submenu/${this.editingSubmenu.id}`, {
      name: this.editingSubmenu.name,
      link: this.editingSubmenu.link,
      sort: this.editingSubmenu.sort,
    }, {
      headers: {'Authorization': sessionStorage.getItem('token')}
    }).subscribe(
      (data: MenuResponse) => {
        this.requesting = false;
        if (data.code === 0) {
          this.edit_submenu_view_show = false;
          alert('编辑子菜单成功');
          location.reload();
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

  editSubmenuNo() {
    this.edit_submenu_view_show = false;
  }
}
