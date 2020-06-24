import { Component, OnInit, HostListener, DoCheck } from "@angular/core";
import { Title } from "@angular/platform-browser";
import * as appConfig from "../assets/app-text.json";
import {
  AuthService,
  UserService,
  NotificationService,
  RefreshTokenService
} from "./services";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements DoCheck {
  ngDoCheck(): void {
    this.startup();
  }
  isLoading: boolean;
  isHeaderVisible: boolean;
  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService
  ) {
    this.titleService.setTitle("Rsystems");
    this.isLoading = false;
    this.isHeaderVisible = false;
    // this.authService.removeCookies();
  }

  startup() {
    if (
      this.router.url.indexOf("login") === -1 &&
      this.router.url !== "/"
    ) {
      this.isHeaderVisible = true;
    } else {
      this.isHeaderVisible = false;
    }
  }
  idleTimeExpired() {
    this.authService.removeCookies();
    this.router.navigate(["/login"], {
      queryParams: {
        returnUrl: this.router.url,
        sessionTimeOut: 1
      }
    });
  }
}
