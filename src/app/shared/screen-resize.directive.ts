import { Directive, HostListener, AfterViewInit } from "@angular/core";
import { WindowSize } from "src/models/window-size";
import { ResizeService } from "../services";

@Directive({
  selector: "[appScreenResize]"
})
export class ScreenResizeDirective implements AfterViewInit {
  constructor(public resizeSvc: ResizeService) { }
  prefix = "is-";

  @HostListener("window:resize", [])
  onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const winWidth = window.outerWidth;
    const currentSize = WindowSize.sizes.find(
      x =>
        (x.minWidth ? winWidth >= x.minWidth : true) &&
        (x.maxWidth ? winWidth <= x.maxWidth : true)
    );

    this.resizeSvc.onResize(currentSize.id);
  }
}
