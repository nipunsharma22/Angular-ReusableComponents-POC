import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import * as appConfig from "../../assets/app-text.json";
import { AuthService, NotificationService, MenuService } from "../services";
import { APP_PAGES } from '../enums/app-pages.enum.js';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private notificationService: NotificationService,
    private menuService: MenuService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuthorized = false;
    const accessToken = this.authenticationService.getAccessToken();
    let requestedPageState: string = state.url.split("/")[1];
   
    
      if (accessToken && accessToken!="") {
        if (requestedPageState == "pagenotfound") {
          return true;
        }
        isAuthorized = this.menuService.isProcessPageAuthorized(
          requestedPageState
        );
        if (!isAuthorized) {
          this.notificationService.error(appConfig.NON_AUTHORIZATION_MESSAGE);
          this.router.navigate(["/accessdenied"]);
        }
        // authorised so return true
        return true;
      }
    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }
}
