import { Component, OnInit } from '@angular/core';
import { NotificationService } from "src/app/services/notification.service";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.success("Notification loaded successfully", "Notification");
    this.notificationService.error("Notification loaded with error successfully", "Notification");
    this.notificationService.warn("Notification loaded with warning successfully", "Notification");
  }

  notification() {
    this.notificationService.success("Notification loaded successfully", "Notification");
    this.notificationService.error("Notification loaded with error successfully", "Notification");
    this.notificationService.warn("Notification loaded with warning successfully", "Notification");
  }



}
