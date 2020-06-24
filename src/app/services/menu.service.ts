import { Injectable } from "@angular/core";
import * as menuConfig from "src/assets/menu.json";
import * as appConfig from "src/assets/app-text.json";
import { Menu } from "../../models/menu";
import { UserService } from "./user.service";
import { CookieService } from "ngx-cookie-service";
import { APP_PAGES_URL } from "../enums/app-pages-url.enum";
import * as sidebarCategoryConfig from "../../assets/side-bar-menu-categories.json";
import { Util } from "../common/util";

@Injectable({
  providedIn: "root"
})
export class MenuService {
  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}
  getAllMenus(): Menu[] {
    const pages: Menu[] = [];
    const menus = menuConfig.Menus;
    console.log(menus)
    menus.forEach(menu => {
      console.log(menu)
      pages.push(this.verifyAccess(this.populateMenu(menu)));
    });
    return pages;
  }
  getAuthorizedProcessPageMenus(): Menu[] {
    const pages: Menu[] = [];
    const menus = menuConfig.Menus.filter(x => x.isStandAlonePage == false);
    console.log(menus)
    menus.forEach(menu => {
      if (menu.isNavigationMenuItem == true && menu.isDashboardItem == true) {
        console.log(menu)
        console.log(this.populateMenu(menu))
        pages.push(this.populateMenu(menu));
      }
    });

    return pages;
  }
  getProcessPageMenus(): Menu[] {
    const pages: Menu[] = [];
    const menus = menuConfig.Menus.filter(x => x.isStandAlonePage === false);
    menus.forEach(menu => {
      pages.push(this.populateMenu(menu));
    });
    return pages;
  }
  getProcessPageMenu(pageUrl: string): Menu {
    const menu = menuConfig.Menus.filter(
      x =>
        Util.removeHypenCharacters(x.url.toLowerCase()) ===
        Util.removeHypenCharacters(pageUrl.toLowerCase())
    )[0];
    if (menu) {
      return this.populateMenu(menu);
    } else {
      return new Menu("", "", true, false, "", "", false, 0);
    }
  }
  isProcessPageAuthorized(pageUrl: string): boolean {
    const menu = menuConfig.Menus.filter(
      x =>
        Util.removeHypenCharacters(x.url.toLowerCase()) ===
        Util.removeHypenCharacters(pageUrl.toLowerCase())
    )[0];
    return this.verifyAccess(this.populateMenu(menu)).IsAuthorized;
  }
  private populateMenu(menu: any): Menu {
    return new Menu(
      menu.displayName,
      menu.url,
      menu.isNavigationMenuItem,
      menu.isDashboardItem,
      menu.category,
      menu.svg,
      menu.isStandAlonePage,
      menu.order
    );
  }
  getSideBarMenuCategories() {
    const categories: string[] = sidebarCategoryConfig.category;

    return categories;
  }
  verifyAccess(menu: Menu): Menu {
    console.log(menu)
    menu.IsAuthorized = false;
    switch (Util.removeHypenCharacters(menu.Url)) {
      case APP_PAGES_URL[APP_PAGES_URL.Dashboard].toLowerCase(): {
        menu.IsAuthorized = true;
        break;
      }
      
    }
    return menu;
  }
  checkLicense(category: string, feature?: number) {
    const licenses = JSON.parse(this.cookieService.get("license"));
    feature = feature || 0;
    let isLicensed = false;
    if (licenses.length > 0) {
      const license = licenses.filter(
        x => x.product.toLowerCase() === category.toLowerCase()
      )[0];
      // tslint:disable-next-line: no-bitwise
      if (
        license &&
        license.licensed &&
        (license.features & feature) === feature
      ) {
        isLicensed = true;
      }
    }
    return isLicensed;
  }
}
