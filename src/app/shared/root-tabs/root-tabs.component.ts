import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ViewEncapsulation,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from "@angular/core";

import { RootTabComponent } from "../root-tab/root-tab.component";

@Component({
  selector: "root-app-tabs",
  templateUrl: "./root-tabs.component.html",
  styleUrls: ["./root-tabs.component.scss"]
})
export class RootTabsComponent {
  tabslength: any;

  @ContentChildren(RootTabComponent) tabs: QueryList<RootTabComponent>;
  ngAfterContentInit() {
    let activeTabs = this.tabs.filter(tab => tab.active);
    this.tabslength = this.tabs.length;
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: any) {
    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
  }
}
