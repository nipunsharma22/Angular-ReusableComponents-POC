import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { LoaderComponent } from "src/app/shared/loader/loader.component";
import { CustomDatePickerComponent } from "./custom-date-picker/custom-date-picker.component";
import { CustomDatePickerHeaderComponent } from "./custom-date-picker-header/custom-date-picker-header.component";
import { AppTimerComponent } from "./app-timer/app-timer.component";
import { FocusMeDirective } from './focus-me.directive';
import { FormsModule } from '@angular/forms';
import { RootTabsComponent } from './root-tabs/root-tabs.component';
import { RootTabComponent } from './root-tab/root-tab.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    LoaderComponent,
    CustomDatePickerComponent,
    CustomDatePickerHeaderComponent,
    FocusMeDirective,
    RootTabsComponent,
    RootTabComponent,
    AppTimerComponent,
    UserProfileComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule,
    MatNativeDateModule,
    MatDatepickerModule,
    InfiniteScrollModule
  ],
  entryComponents: [
    CustomDatePickerComponent,
    CustomDatePickerHeaderComponent
  ],
  exports: [
    LoaderComponent,
    CustomDatePickerComponent,
    MatDatepickerModule,
    RootTabsComponent,
    RootTabComponent,
    AppTimerComponent,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
