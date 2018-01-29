export class MenusResponse {
  code: number;
  message: string;
  menus: Menu[];
}

export class MenuResponse {
  code: number;
  message: string;
  menus: Menu;
}

export class Menu {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  name_en: string;
  icon: string;
  remark: string;
  sort: number;
  status: number;
  submenus: Submenu[];

  public constructor(fields?: {
    id: number,
    created_at: string;
    updated_at: string,
    name: string,
    name_en: string,
    icon: string,
    remark: string,
    sort: number,
    status: number,
    submenus: Submenu[]
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

// export class Submenu {
//   id: number;
//   created_at: string;
//   updated_at: string;
//   name: string;
//   link: string;
//   sort: number;
//   status: number;
//   menu_id: number;
//
//   public constructor(fields?: {
//     id: number,
//     created_at: string;
//     updated_at: string,
//     name: string,
//     link: string,
//     sort: number,
//     status: number,
//     menu_id: number
//   }) {
//     if (fields) {
//       Object.assign(this, fields);
//     }
//   }
// }

export class Submenu {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  link: string;
  sort: number;
  status: number;
  menu_id: number;
  // menu: Menu;

  public constructor(fields?: {
    id: number,
    created_at: string;
    updated_at: string,
    name: string,
    link: string,
    sort: number,
    status: number,
    menu_id: number
    // menu: Menu
  }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class AddSubmenuResponse {
  code: number;
  message: string;
  submenu: Submenu;
}
