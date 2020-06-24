import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor( private location: Location,private router:Router) {
  }

  ngOnInit() {
  }

  backurl = () => {
     //this.location.back();
    this.router.navigate(["/dashboard"]);
  }

}
