import { Component, OnInit } from "@angular/core";
import { DataService, Person } from "../services/pagination-data.service";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-pagination-poc",
  templateUrl: "./pagination-poc.component.html",
  styleUrls: ["./pagination-poc.component.scss"],
})
export class PaginationPocComponent implements OnInit {
  contentArray = new Array();
  contentArray1 = new Array();
  returnedArray: string[];
  showBoundaryLinks = true;
  showDirectionLinks = true;
  rotate = true;
  maxSize = 5;
  status = "ON";
  bigTotalItems = 175;
  bigCurrentPage = 1;
  disabled = false;
  page = 1;

  /* ng-bootstrap package */
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.contentArray = this.dataService.getPeople();
    this.returnedArray = this.contentArray.slice(0, 10);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  toggleState(): void {
    this.disabled = !this.disabled;
  }

  toggleBtn(): void {
    this.rotate = !this.rotate;
    this.status = this.rotate ? "ON" : "OFF";
  }
}

