import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as config from "../../assets/config.json";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private httpService: HttpClient,
    private cookieService: CookieService
  ) {}
  getCurrentUser(): Observable<any> {
    return this.httpService.get(
      config.ServiceRootUrls.gatewayServiceUrl +
        config.ServiceUrls.getCurrentUserServiceUrl
    );
  }
  setUser(userData: any, tokenData: any) {
    if (this.cookieService.check("isAdmin")) {
      this.cookieService.delete("isAdmin");
    }
    const expirationTime = new Date(tokenData.expiresAt);
    this.cookieService.set(
      "isAdmin",
      userData.user[0].isAdmin,
      expirationTime,
      null,
      null,
      true,
      "None"
    );
    if (this.cookieService.check("user")) {
      this.cookieService.delete("user");
    }
    const refreshTokenExpirationTime = new Date(tokenData.expiresAt);
    refreshTokenExpirationTime.setMinutes(
      refreshTokenExpirationTime.getMinutes() + tokenData.lifetime * 3
    );
    this.cookieService.set(
      "user",
      userData.user[0].userName,
      refreshTokenExpirationTime,
      null,
      null,
      true,
      "None"
    );
    if (this.cookieService.check("license")) {
      this.cookieService.delete("license");
    }
    this.cookieService.set(
      "license",
      JSON.stringify(userData.license),
      expirationTime,
      null,
      null,
      true,
      "None"
    );
  }
  getUserName(): string {
    return this.cookieService.get("user").toLowerCase();
  }
  getToken(): string {
    return this.cookieService.get("access_token");
  }
  isUserLicenseExists(): boolean {
    return this.cookieService.check("license");
  }
  isUserAdmin() {
    return JSON.parse(this.cookieService.get("isAdmin")) === true;
  }
  getuserLicense() {
    return JSON.parse(this.cookieService.get("license"));
  }
}
