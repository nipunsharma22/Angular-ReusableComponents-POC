// import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
// import { FormBuilder, FormArray, Validators } from "@angular/forms";
// import { ValidatePassword } from "../must-match/validate-password";
import { Component, OnInit } from '@angular/core';  
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';  
//import { FormArray } from '@angular/forms/src/model';  



@Component({
  selector: 'app-angform',
  templateUrl: './angform.component.html',
  styleUrls: ['./angform.component.scss']
})
export class AngformComponent implements OnInit {
  registrationForm: FormGroup;  
  isSubmitted: boolean = false;  
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']
  constructor(private formBuilder: FormBuilder) {  
    this.registrationForm = this.formBuilder.group({  
      firstName: new FormControl('', [  
        Validators.required,  
        Validators.minLength(3),  
        Validators.maxLength(30),  
        Validators.pattern('^[a-zA-Z ]*$')]),  
      lastName: new FormControl('', []),  
      addressGroup: this.formBuilder.group({  
        address: new FormControl('', [  
          Validators.required,  
          Validators.maxLength(255)  
        ]),  
        city: new FormControl('', []),  
        state: new FormControl('', []),  
        pincode: new FormControl('', [  
          Validators.required,  
          Validators.minLength(6),  
          Validators.maxLength(8),  
          Validators.pattern('^[a-zA-Z0-9]*$')])         
      }),  
      phoneNumber: new FormControl('', [  
        Validators.required,  
        Validators.minLength(8),  
        Validators.maxLength(12),  
        Validators.pattern('^[0-9]*$')]),  
      email: new FormControl('', [  
        Validators.required,  
        Validators.minLength(5),  
        Validators.maxLength(80),  
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")  
      ]),  
      password: new FormControl('', [  
        Validators.required,  
        Validators.minLength(5),  
        Validators.maxLength(12)          
      ])  
    });  
  }  
  

  changeCity(e) {
    this.registrationForm.get('address.cityName').setValue(e.target.value, {
      onlySelf: true
    })
  }

  ngOnInit() {  
    console.log("Registration Form ", this.registrationForm);
  }  
  
  onRegistrationFormSubmit() {  
    this.isSubmitted = true;  
    if(this.registrationForm.valid){        
      console.log("User Registration Form Submit", this.registrationForm.value);  
    }  
      
  }  
}  