import { Injectable, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { CookieService } from "ngx-cookie-service";
import { Subject, Observable } from 'rxjs';

let moment = require("moment");

@Injectable({
  providedIn: "root"
})
export class RefreshTokenService {
  public subject = new Subject<any>();
  public refreshTokenSubject = new Subject<any>();

  public idleTimeSubject = new Subject<any>();

  tokenNeedToBeRefreshed() {
    this.refreshTokenSubject.next({ isTokenToBeRefreshed: true });
  }
  tokenRefreshed() {
    this.refreshTokenSubject.next({ isTokenRefreshed: true });
  }
  timerRefresh() {
    this.idleTimeSubject.next({ isTimerToBeRefreshed: true });
  }
  clearMessage() {
    return this.subject.next();
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  getRefreshTokenMessage(): Observable<any> {
    return this.refreshTokenSubject.asObservable();
  }
  getTimerRefreshMessage(): Observable<any> {
    return this.idleTimeSubject.asObservable();
  }
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  refreshToken() {
    if (
      this.cookieService.get("refreshToken") != "" &&
      this.userService.getUserName() !== ""
    ) {
      this.authService.refreshAuthorizationToken().subscribe(tokenData => {
        //this.authService.removeCookies();
        this.authService.setAccessToken(tokenData);

        this.userService.getCurrentUser().subscribe(userData => {
          this.userService.setUser(userData, tokenData);
          this.tokenRefreshed();
        });
      });
    }
  }
}
