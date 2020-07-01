import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-gird',
  templateUrl: './gird.component.html',
  styleUrls: ['./gird.component.scss']
})
export class GirdComponent implements OnInit {
  // Grid One Variables  
  @ViewChild('myTable') table: any;
  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  ColumnMode = ColumnMode;

// Grid Two Variables 
  rows1 = [];
  ColumnMode1 = ColumnMode;
  temp: any = [
  {
    "name": "Ethel Price",
    "gender": "female",
    "company": "Johnson, Johnson and Partners",
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
    "name": "Georgina Schultz",
    "gender": "female",
    "company": "Suretech",
    "age": 35,
    "treeStatus": "collapsed"
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
    this.fetch(data => {
      this.rows = data;
    });
    this.rows1 = this.temp;
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/grid-data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.rows1 = [...this.rows1];
  }

}