import { Component, ViewEncapsulation, OnInit, DoCheck } from "@angular/core";
import { Menu } from "../../models/menu";
import { MenuService, UserService } from "../services";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  navigationPages: Menu[] = [];
  isUserExists = false;

  constructor(
    private menuService: MenuService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.navigationPages = this.menuService
      .getAuthorizedProcessPageMenus();
    console.log(this.navigationPages)
  }

}
