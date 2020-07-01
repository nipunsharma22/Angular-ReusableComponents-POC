import { BrowserModule, Title } from "@angular/platform-browser";

import { NgModule, ErrorHandler, Injectable } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppRoutingModule } from "./app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { TokenInterceptor } from "./common/token.interceptor";
import { CustomErrorHandler } from "./common/custom.error.handler";
import { LoggingInterceptor } from "./common/logging.interceptors";
import { HeaderComponent } from "./shared/header/header.component";
import { ScreenResizeDirective } from "./shared/screen-resize.directive";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { UnAuthorizedPageComponent } from "./shared/un-authorized-page/un-authorized-page.component";
import { SafeHtmlPipe } from "./shared/safe-html.pipe";
import { ConfirmationDialogComponent } from "./shared/confirmation-dialog/confirmation-dialog.component";
import { AppEventDirective } from "./shared/app-event.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatNativeDateModule } from "@angular/material";
import { NgxPaginationModule } from "ngx-pagination";

import { TreeModule } from "primeng/tree";

import { AutoCompleteModule } from "primeng/autocomplete";
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';

import {
  DefaultUrlSerializer,
  UrlTree,
  UrlSerializer,
  RouterLinkActive,
} from "@angular/router";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
} from "@angular/material";
import { PaginationPocComponent } from "./pagination-poc/pagination-poc.component";
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileUploaderService } from './services/file-uploader.service';
import { GmapsComponent } from './gmaps/gmaps.component';
import { AngformComponent } from './angform/angform.component';
import { IframeFormComponent, SafePipe } from './iframe-form/iframe-form.component';
import { GraphformComponent } from './graphform/graphform.component';
import { AccordianformComponent } from './accordianform/accordianform.component';
import { CustomeditorformComponent } from './customeditorform/customeditorform.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { DropDownComponent } from './drop-down/drop-down.component';


import { DatepickerComponent } from './datepicker/datepicker.component';
import { NotificationComponent } from './notification/notification.component';
import { DialogComponent } from './dialog/dialog.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { GridViewComponent } from './Grid-View/grid-view.component';
@Injectable()
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    let actualURl = "";
    let urlportion = url.split("#");
    if (urlportion.length > 0) {
      actualURl = urlportion[0].toLocaleLowerCase();
    }
    if (urlportion.length > 1) {
      actualURl = actualURl + "#" + urlportion[1];
    }
    return super.parse(actualURl);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ScreenResizeDirective,
    PageNotFoundComponent,
    ConfirmationDialogComponent,
    UnAuthorizedPageComponent,
    SafeHtmlPipe,
    AppEventDirective,
    LoginComponent,
    PaginationPocComponent,
    AutoCompleteComponent,
    FileUploaderComponent,
    GmapsComponent,
    AngformComponent,
    IframeFormComponent,
    GraphformComponent,
    AccordianformComponent,
    CustomeditorformComponent,
    SafePipe,
    ProgressbarComponent,
    MenuBarComponent,
    DropDownComponent,
    GridViewComponent,
    DatepickerComponent,
    NotificationComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    SharedModule,
    TreeModule,
    AutoCompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsr9LR_o8dWSd5i2rFO1kxdAKXnmolfU4',
      libraries: ['places']
    }),
    NgSelectModule,
    CKEditorModule,
    ChartsModule,
    NgMultiSelectDropDownModule,
    NgxDatatableModule,
    PaginationModule.forRoot()
  ],
  providers: [
    Title,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    CookieService,
    FileUploaderService
  ],
  entryComponents: [ConfirmationDialogComponent],

  bootstrap: [AppComponent],
})
export class AppModule { }
