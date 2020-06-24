import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-iframe-form',
  templateUrl: './iframe-form.component.html',
  styleUrls: ['./iframe-form.component.scss']
})
export class IframeFormComponent implements OnInit {

  constructor() { }
  video: string = "https://www.youtube.com/embed/CmzKQ3PSrow"
  ngOnInit(): void {
  }

}

