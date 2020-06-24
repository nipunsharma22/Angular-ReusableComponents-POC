import { Component, OnInit } from '@angular/core';
//import ClassicEditor from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-customeditorform',
  templateUrl: './customeditorform.component.html',
  styleUrls: ['./customeditorform.component.scss']
})
export class CustomeditorformComponent implements OnInit {
  name = 'Angular 9';
  constructor() { }

  ngOnInit(): void {
  }
  editor = ClassicEditor;
  data: any = `<p>Symphony Project.</p>`;

}