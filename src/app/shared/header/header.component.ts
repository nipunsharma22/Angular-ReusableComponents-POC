import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
  ElementRef
} from "@angular/core";
import { SCREEN_SIZE } from "src/app/enums/screen-size.enum";
import { delay } from "rxjs/internal/operators/delay";
import * as appConfig from "../../../assets/app-text.json";
import * as modalData from "../../../assets/modal-text.json";
import { Menu } from "../../../models/menu";
import { SideBarMenu } from "../../../models/side-bar-menu";
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Subscription } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import { WindowSize } from "src/models/window-size.js";
import {
  ResizeService,
  MenuService,
  UserService,
  AuthService,
  ConfirmationDialogService
} from "src/app/services";
import { Util } from "src/app/common/util.js";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  size: SCREEN_SIZE;
  headerMenuTitle: string;
  userName: string;
  isNavigationBarShown: boolean;
  isSideBarShown: boolean;
  isAuth: boolean;
  currentPage: string;
  currentUrl: string;
  sideBarCategories: string[] = [];
  navigationPages: Menu[] = [];
  sideBarPages: SideBarMenu[] = [];
  currentPageSubscription: Subscription;
  resizeSubscription: Subscription;
  previousUrl: string;
  currenturl: string;
  helpURL: string;
  urldata: any;
  appText: any;
  get screenSizes() {
    return SCREEN_SIZE;
  }
  constructor(
    private router: Router,
    private resizeSvc: ResizeService,
    private menuService: MenuService,
    private userService: UserService,
    private eRef: ElementRef,
    private authService: AuthService,
    private confirmDialogService: ConfirmationDialogService
  ) {
    this.appText = appConfig;
    if (this.authService.isAuthenticated) {
      this.onInit();
    }
  }
  onInit() {
    let isHeaderSetByRoute = false;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.setHeaderText();
        isHeaderSetByRoute = true;
      }
    });
    if (!isHeaderSetByRoute) {
      this.setHeaderText();
    }
    this.resizeSvc.onResize$.pipe(delay(0)).subscribe(x => {
      this.size = x;
    });
    this.setWindowSizeOnLoad();
  }

  setWindowSizeOnLoad() {
    const winWidth = window.innerWidth;
    const currentSize = WindowSize.sizes.find(
      x =>
        (x.minWidth ? winWidth >= x.minWidth : true) &&
        (x.maxWidth ? winWidth <= x.maxWidth : true)
    );
    this.size = currentSize.id;
  }
  setHeaderText() {
    let requestedPageState: string = this.router.url.split("/")[1];
    
    this.urldata = this.menuService.getProcessPageMenu(requestedPageState);

    if (typeof this.urldata === "undefined") {
      this.currentPage = "";
    }
    if (typeof this.urldata !== "undefined") {
      this.currentPage = this.urldata.DisplayName;
      this.currentUrl = this.urldata.Url;
    }
  }
  @HostListener("document:click", ["$event"])
  @HostListener("document:touchstart", ["$event"])
  handleOutsideClick(event) {
    if (this.eRef.nativeElement.contains(event.target) === false) {
      this.isNavigationBarShown = false;
      this.isSideBarShown = false;
    }
  }
  onMenuItemClick(pageUrl: string) {
    this.isNavigationBarShown = false;
    this.isSideBarShown = false;
    this.router.navigate([pageUrl]);
  }
  ngOnInit() {
    if (this.authService.isAuthenticated) {
      //this.helpURL = urlConfig.dashboard;
      this.isNavigationBarShown = false;
      this.isSideBarShown = false;
      this.userName = this.userService.getUserName();
      this.headerMenuTitle = appConfig.MENU_HEADER_TITLE;
      this.navigationPages = this.menuService.getAuthorizedProcessPageMenus();
      //Api Calls for Side bar Menu
      this.sideBarCategories = this.menuService.getSideBarMenuCategories();
      this.sideBarPages = this.getSideBarMenus(
        this.navigationPages,
        this.sideBarCategories
      );
    }
  }

  getSideBarMenus(pages: Menu[], categories: string[]) {
    let sideBarPages: SideBarMenu[] = [];
    categories.forEach(category => {
      let menus = pages.filter(item => item.Category === category);
      if (menus.length > 0) {
        sideBarPages.push(new SideBarMenu(category, menus));
      }
    });
    return sideBarPages;
  }

  logout = () => {
    this.confirmDialogService.okCancelSmallConfirm(
      modalData.SIGN_OUT_TITLE,
      modalData.SIGN_OUT_TEXT,
      modalData.BUTTON_YES,
      modalData.BUTTON_NO,
      () => {
        this.authService.removeCookies();
        this.router.navigate(["/login"]);
      },
      () => {}
    );
  };

    logAnimation(_event) {
    console.log(_event)
  }
  
}
