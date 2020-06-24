import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as config from "src/assets/config.json";
import * as modalData from "src/assets/modal-text.json";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./user.service";
import { ConfirmationDialogService } from "./confirmation-dialog.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpService: HttpClient,
    private cookieService: CookieService,
    private userService: UserService,
    private confirmationService: ConfirmationDialogService,
    private confirmationDialogService: ConfirmationDialogService
  ) {}
  getAuthorizationToken(userEmail: string, userPassword: string): Observable<any> {
    let userLogin = {
      userEmail: userEmail.replace(/\\/g, "\\"),
      userPassword: userPassword
    };
    return this.httpService.post(
      config.ServiceRootUrls.gatewayServiceUrl +
        config.ServiceUrls.getJwtUserToken,
      userLogin
    );
  }
  refreshAuthorizationToken(): Observable<any> {
    let userRefresh = {
      userName: this.userService.getUserName().replace(/\\/g, "\\"),
      refreshToken: this.cookieService.get("refreshToken")
    };

    return this.httpService.post(
      config.ServiceRootUrls.gatewayServiceUrl +
        config.ServiceUrls.getRefreshedJwtUserSecurityToken,
      userRefresh
    );
  }
  logout() {
    this.removeCookies();
  }
  removeCookies() {
    this.confirmationService.clearMessage();
    this.deleteCookies();
    this.cookieService.deleteAll("/");
    this.cookieService.deleteAll();
    //window.postMessage({ type: "CLEAR_COOKIES_DOCUMENT" }, "*");
  }

  deleteCookies() {
    var res = document.cookie;
    if (res != "") {
      var multiple = res.split(";");
      if (multiple.length > 0) {
        for (var i = 0; i < multiple.length; i++) {
          var key = multiple[i].split("=");
          document.cookie =
            key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
        }
      }
    }
  }
  getAccessToken(): string {
    const tokenData = this.isAuthenticated
      ? this.cookieService.get("access_token")
      : "";
    if (tokenData != "") {
      return tokenData;
    }
    return tokenData;
  }
  getRefreshToken(): string {
    const tokenData = this.cookieService.get("refreshToken");

    return tokenData;
  }
  setAccessToken(tokenData: any): void {
    console.log(tokenData)
    if (this.cookieService.check("access_token")) {
      this.cookieService.delete("access_token");
    }
    const expirationTime = new Date(tokenData.expiresAt);
    this.cookieService.set(
      "access_token",
      tokenData.token,
      expirationTime,
      null,
      null,
      true,
      "None"
    );
    this.cookieService.set(
      "tokenCreatedTime",
      new Date().toUTCString(),
      expirationTime,
      null,
      null,
      true,
      "None"
    );
    this.cookieService.set(
      "expiresAt",
      tokenData.expiresAt,
      expirationTime,
      null,
      null,
      true,
      "None"
    );

    //Expiration time of refresh token is set to 3 times times the expitation of token
    const refreshTokenExpirationTime = new Date(tokenData.expiresAt);
    refreshTokenExpirationTime.setMinutes(
      refreshTokenExpirationTime.getMinutes() + tokenData.lifetime * 3
    );
    this.cookieService.set(
      "token_lifetime",
      tokenData.lifetime,
      new Date(refreshTokenExpirationTime),
      null,
      null,
      true,
      "None"
    );
    this.cookieService.set(
      "refreshToken",
      tokenData.refreshToken,
      new Date(refreshTokenExpirationTime),
      null,
      null,
      true,
      "None"
    );
    this.setIdleTimeStartDate();
  }
  get isAuthenticated(): boolean {
    return this.cookieService.check("access_token");
  }
  getTokenLifeTime() {
    const expirationTime = this.cookieService.get("token_lifetime");

    return expirationTime;
  }
  getTokenExpirationDate() {
    const expirationTime = this.cookieService.get("expiresAt");

    return expirationTime;
  }
  getTokenCreationDate() {
    const expirationTime = this.cookieService.get("tokenCreatedTime");

    return expirationTime;
  }

  getIdleTimeStartDate() {
    const idleTimeStartDate = this.cookieService.get("idle_time_start_date");

    return idleTimeStartDate;
  }
  setIdleTimeStartDate() {
    if (this.cookieService.check("idle_time_start_date")) {
      this.cookieService.delete("idle_time_start_date");
    }
    const tokenLifetime = this.cookieService.get("expiresAt");
    const expirationTime = new Date(tokenLifetime);

    this.cookieService.set(
      "idle_time_start_date",
      new Date().toUTCString(),
      expirationTime,
      null,
      null,
      true,
      "None"
    );
  }

  public checkUnauthorizedAccess(statusCode: string): void {
    this.confirmationDialogService.okBasicConfirm(
      modalData.RELOGIN_TITLE,
      modalData.RELOGIN_BODY_TEXT,
      "<span class='italic-text-popup'> Please login to continue.</span>",
      modalData.BUTTON_OK,
      "" + statusCode + ""
    );
  }
}
