import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap, timeout } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { APP_PAGES_ACTIONS } from "src/app/enums/app-pages-actions.enum";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  public serviceHostUrl: string;

  constructor(
    public httpService: HttpClient,
    public cookieService: CookieService,
  ) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  public reponseDataGet(urlBody: any, passingParams?: any): Observable<any> {
    if (
      urlBody.serviceUrl.includes("dialog") ||
      urlBody.serviceUrl.includes("usage")
    ) {
      return this.dialogBehaviourSpecific(urlBody, 0);
    }
    const postUrl = urlBody.hostUrl + urlBody.serviceUrl;
    const parameters = passingParams !== undefined ? passingParams : {};

    return this.httpService
      .get(postUrl, { params: parameters })
      .pipe(map(this.extractData));
  }
  public reponseDataPost(urlBody: any, body?: any): Observable<any> {
    const postUrl = urlBody.hostUrl + urlBody.serviceUrl;
    let newBody = body !== undefined ? body : "";

    return this.httpService
      .post<any>(postUrl, newBody)
      .pipe(catchError(this.handleError<any>(`Error Response`)));
  } 
 
  public dialogBehaviourSpecific(
    urlBody: any,
    dialogId: number,
    body?: any,
    params?: any,
    action: string = ""
  ): Observable<any> {
    let postUrl = "";
    let parameters = params !== undefined ? params : {};
    if (dialogId === 0) {
      postUrl = urlBody.hostUrl + urlBody.serviceUrl;
    } else {
      postUrl = urlBody.hostUrl + urlBody.serviceUrl + "/" + dialogId;
    }
    switch (action) {
      case APP_PAGES_ACTIONS.GET_DETAILS:
        return this.httpService
          .get(postUrl, { withCredentials: true })
          .pipe(map(this.extractData));
      case APP_PAGES_ACTIONS.DELETE:
        return this.httpService
          .delete(postUrl, { withCredentials: true })
          .pipe(map(this.extractData));
      case APP_PAGES_ACTIONS.PUBLISH:
        return this.httpService
          .put(
            postUrl + "/" + APP_PAGES_ACTIONS.PUBLISH,
            {},
            { withCredentials: true }
          )
          .pipe(map(this.extractData));
      case APP_PAGES_ACTIONS.ADD:
        return this.httpService
          .post(postUrl, body, { withCredentials: true })
          .pipe(map(this.extractData));
      case APP_PAGES_ACTIONS.SAVE_DRAFT:
        return this.httpService
          .put(postUrl, body, { withCredentials: true })
          .pipe(map(this.extractData));
      case APP_PAGES_ACTIONS.SAVE_PUBLISH:
        return this.httpService
          .put(
            postUrl + "/" + APP_PAGES_ACTIONS.PUBLISH,
            {},
            { withCredentials: true }
          )
          .pipe(map(this.extractData));
      case APP_PAGES_ACTIONS.CHECK_DUPLICATE:
        return this.httpService
          .get(postUrl, { withCredentials: true, params: parameters })
          .pipe(map(this.extractData));
      default:
        return this.httpService
          .get(postUrl, { withCredentials: true })
          .pipe(map(this.extractData));
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead data
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
