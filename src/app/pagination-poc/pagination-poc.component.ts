import { Component, OnInit } from "@angular/core";
import { DataService, Person } from '../services/pagination-data.service';

@Component({
  selector: "app-pagination-poc",
  templateUrl: "./pagination-poc.component.html",
  styleUrls: ["./pagination-poc.component.scss"],
})
export class PaginationPocComponent implements OnInit {
  people: any;

  // Pagination parameters.
  p: number = 1;
  count: number = 5;

  constructor(private dataService: DataService) {}

    ngOnInit() {
        this.people = this.dataService.getPeople();
        console.log(this.people);
    }
}
