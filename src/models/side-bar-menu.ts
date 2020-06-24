import { Menu } from './menu';

export class SideBarMenu {
    Category: string;
    MenuItems: Menu[] = [];
    constructor(category: string, menuItems: Menu[]) {
        this.Category = category;
        this.MenuItems = menuItems;
    }
}