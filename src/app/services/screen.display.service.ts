import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenDisplayService {

  public isLargeDisplay = new BehaviorSubject(false);
  public isMediumDisplay = new BehaviorSubject(false);
  public isSmallDisplay = new BehaviorSubject(false);
  public isSmall: boolean;


  get isSmallSize(): boolean {
    if (window.innerWidth) {
      // this.isSmall = value;
      // this.isSmallDisplay.next();
      }
    return false;
  }
}
