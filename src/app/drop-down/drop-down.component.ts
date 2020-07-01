import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  dropdownSingleList = [];
  selectedSeingleItems = [];
  dropdownsingleSettings: IDropdownSettings = {};
  closeDropDownOnSelection = false;

  isShowlibraryList = false;
  selectedListArray: any = [];
  selectedListValue: any = '';
  dataList: any = [
    { item_id: 1, item_text: 'Mumbai', item_isSelected: false },
      { item_id: 2, item_text: 'Bangaluru', item_isSelected: false },
      { item_id: 3, item_text: 'Pune', item_isSelected: false },
      { item_id: 4, item_text: 'Navsari', item_isSelected: false },
      { item_id: 5, item_text: 'New Delhi', item_isSelected: false },
  ];

  constructor(private eRef: ElementRef) {}

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSingleList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedSeingleItems = [
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownsingleSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onShowListPopup(isShow: boolean) {
    this.isShowlibraryList = !isShow;
  }

  // Selected Value with array
  onSelectListValue(event: any, dataitem: any) {
    this.selectedListArray = [];
    dataitem.item_isSelected = !dataitem.item_isSelected;
    // code will be use in future
    this.dataList.forEach((element) => {
      if (element.item_isSelected === true) {
        this.selectedListArray.push(element);
      }
    });
    this.getSelectedValue(this.selectedListArray);
  }

// Create comma seprator Value
getSelectedValue(selectedListArray: any) {
  this.selectedListValue = '';
  selectedListArray.forEach((element) => {
    if (element.item_isSelected === true) {
      if (this.selectedListValue !== '') {
        this.selectedListValue += ', ' + element.item_text;
      } else {
        this.selectedListValue += element.item_text;
      }
    }
  });
  // this.sendselectedValue(this.selectedListValue);
  // this.sendselectedValue(this.dataList);
}

@HostListener('document:click', ['$event'])
 handleOutsideClick(event: any) {
   if (this.eRef.nativeElement.contains(event.target) === false) {
     this.isShowlibraryList = false;
   }
 }

}
