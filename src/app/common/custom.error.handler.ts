import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { AuthService } from "../services";
@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private authService: AuthService) {}
  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors

      if (error.status === 401) {
        this.authService.removeCookies();
      }
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // this.notificationService.error(errorMessage);
    return throwError(errorMessage);
  }
}
