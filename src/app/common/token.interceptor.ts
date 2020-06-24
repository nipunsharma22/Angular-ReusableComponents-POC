import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as config from "../../assets/config.json";
import * as appConfig from "../../assets/app-text.json";
import { Observable } from "rxjs/internal/Observable";
import {
  AuthService,
  ConfirmationDialogService,
  NotificationService
} from "../services";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
// import * as modalData from '../../../assets/modal-text.json';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    public _confirmationDialogService: ConfirmationDialogService,
    public _notificationService: NotificationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !(
        request.url.indexOf(
          config.ServiceRootUrls.gatewayServiceUrl +
            config.ServiceUrls.getJwtUserToken
        ) !== -1 ||
        request.url.indexOf(
          config.ServiceRootUrls.gatewayServiceUrl +
            config.ServiceUrls.getRefreshedJwtUserSecurityToken
        ) !== -1
      )
    ) {
      if (
        request.url.includes("dialog-behaviours") ||
        request.url.includes("usage-profiles")
      ) {
        const authorizationToken = this.authService.getAccessToken();
        if (authorizationToken) {
          request = request.clone({
            setHeaders: {
              token: authorizationToken,
              "Content-Type": "application/json"
            }
          });
        }
      } else {
        // add authorization header with jwt token if available
        const authorizationToken = this.authService.getAccessToken();
        if (authorizationToken) {
          if (
            request.method === appConfig.REQUEST_METHOD_POST &&
            request.body != undefined
          ) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${authorizationToken}`,
                "Content-Type": "application/json"
              }
            });
          } else {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${authorizationToken}`
              }
            });
          }
        } else {
          // Check authorization token is blank
          return next.handle(request).pipe(
            tap(
              (event: HttpEvent<any>) => {},
              error => {
                var resError = error as HttpErrorResponse;
                if (
                  (resError && resError.status == 401) ||
                  resError.status == 403
                ) {
                  this.authService.checkUnauthorizedAccess(
                    resError.status.toString()
                  );
                }
              }
            )
          );
        }
        // New code, Check Un-Authorized request 30-01-2020
        return next.handle(request).pipe(
          tap(
            (event: HttpEvent<any>) => {},
            error => {
              var resError = error as HttpErrorResponse;
              if (
                (resError && resError.status == 401) ||
                resError.status == 403
              ) {
                this.authService.checkUnauthorizedAccess(
                  resError.status.toString()
                );
              }
              if (resError && resError.status == 500) {
                this._notificationService.error(
                  "Internal server error to  get API response",
                  "Server Error"
                );
                return false;
              }
            }
          )
        );
      }

      return next.handle(request);
    } else {
      request = request.clone({
        setHeaders: {
          "Content-Type": "application/json"
        }
      });
      return next.handle(request);
    }
  }
}
