import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { UserProfileComponent } from "./shared/user-profile/user-profile.component";
import { AngformComponent } from "./angform/angform.component";
import { UnAuthorizedPageComponent } from "./shared/un-authorized-page/un-authorized-page.component";
import { AuthGuard } from "./common/auth-gaurd";
import { LoginComponent } from "./login/login.component";
import { APP_PAGES } from "./enums/app-pages.enum";
import { PaginationPocComponent } from './pagination-poc/pagination-poc.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { IframeFormComponent, SafePipe } from './iframe-form/iframe-form.component';
import { AccordianformComponent } from './accordianform/accordianform.component';
import { CustomeditorformComponent } from './customeditorform/customeditorform.component';
import { GraphformComponent } from './graphform/graphform.component';
import { ProgressBarComponent } from '@swimlane/ngx-datatable';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';
import { GirdComponent } from './gird/gird.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { DatepickerComponent } from './datepicker/datepicker.component'
import { NotificationComponent } from './notification/notification.component'
import { DialogComponent } from './dialog/dialog.component'

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "pagination",
    component: PaginationPocComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "auto-complete",
    component: AutoCompleteComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "file-uploader",
    component: FileUploaderComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "google-map",
    component: GmapsComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "date-timepicker",
    component: DatepickerComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "notification",
    component: NotificationComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "dialog",
    component: DialogComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
  },
  { path: "angform", component: AngformComponent },
  { path: "iframe", component: IframeFormComponent },
  { path: "accordian", component: AccordianformComponent },
  { path: "ckeditor", component: CustomeditorformComponent },
  { path: "graph", component: GraphformComponent },
  { path: "login", component: LoginComponent },
  {
    path: 'progressbar', component: ProgressbarComponent
  },
  {
    path: 'menuBar', component: MenuBarComponent
  },
  {
    path: 'dropdown', component: DropDownComponent
  },
  {
    path: 'grid', component: GirdComponent
  },
  { path: "**", redirectTo: "/pagenotfound", pathMatch: "full" },
  {
    path: "pagenotfound",
    component: PageNotFoundComponent,
    // canActivate: [AuthGuard]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes), NgSelectModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
