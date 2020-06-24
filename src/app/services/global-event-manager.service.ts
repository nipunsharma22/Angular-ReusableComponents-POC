import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, Observer } from 'rxjs';
import { distinctUntilChanged, delay } from 'rxjs/operators';
import { UserService } from './user.service';
import { Menu } from 'src/models/menu';
import { MenuService } from './menu.service';
@Injectable({
  providedIn: 'root'
})
export class GlobalEventManagerService {

  private currentUserNameSubject = new  BehaviorSubject<string>('');
  public currentUserName: Observable<string>;

  private currentPageSubject = new  BehaviorSubject<string>('');
  

  constructor(private userService: UserService,private menuService: MenuService) {
    this.currentUserNameSubject = new BehaviorSubject<string>(this.userService.getUserName());
    this.currentUserName = this.currentUserNameSubject.asObservable();
    
  }

  public get currentPage$() {
    return this.currentPageSubject.asObservable();
  }
  public get currentUserValue(): string {
    return this.currentUserNameSubject.value;
  }

  setCurrentUserName(userName: string) {
    this.currentUserNameSubject.next(userName);
  }
  setCurrentPage(pageUrl: string) {
    let menuItem = this.menuService.getProcessPageMenu(pageUrl);
    this.currentPageSubject.next(menuItem.DisplayName);
  }

}
