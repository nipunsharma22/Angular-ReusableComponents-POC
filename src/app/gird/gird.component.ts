import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-gird',
  templateUrl: './gird.component.html',
  styleUrls: ['./gird.component.scss']
})
export class GirdComponent implements OnInit {


  rows = [];
  ColumnMode = ColumnMode;
  temp: any = [
  {
    "name": "Ethel Price",
    "gender": "female",
    "company": "Johnson, Johnson and Partners, LLC CMP DDC",
    "age": 22,
    "treeStatus": "collapsed"
  },
  {
    "name": "Claudine Neal",
    "gender": "female",
    "company": "Sealoud",
    "age": 55,
    "treeStatus": "disabled"
  },
  {
    "name": "Beryl Rice",
    "gender": "female",
    "company": "Velity",
    "age": 67,
    "treeStatus": "disabled"
  },
  {
    "name": "Wilder Gonzales",
    "gender": "male",
    "company": "Geekko",
    "age": 52,
    "treeStatus": "disabled"
  },
  {
    "name": "Georgina Schultz",
    "gender": "female",
    "company": "Suretech",
    "age": 35,
    "treeStatus": "collapsed"
  },
  {
    "name": "Carroll Buchanan",
    "gender": "male",
    "company": "Ecosys",
    "age": 42,
    "treeStatus": "disabled"
  },
  {
    "name": "Valarie Atkinson",
    "gender": "female",
    "company": "Hopeli",
    "age": 27,
    "treeStatus": "disabled"
  },
  {
    "name": "Schroeder Mathews",
    "gender": "male",
    "company": "Polarium",
    "age": 45,
    "manager": "Ethel Price",
    "treeStatus": "disabled"
  },
  {
    "name": "Lynda Mendoza",
    "gender": "female",
    "company": "Dogspa",
    "manager": "Georgina Schultz",
    "treeStatus": "disabled"
  }
];

  constructor() { }

  ngOnInit(): void {
    this.rows = this.temp;
  }


  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }
}

