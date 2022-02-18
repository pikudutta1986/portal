import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { HelperService } from '../../../../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-survey-two',
  templateUrl: './survey-two.component.html',
  styleUrls: ['./survey-two.component.css']
})
export class SurveyTwoComponent implements OnInit {

  formData: FormGroup;

  constructor(private helperService: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      name: [ '', Validators.required],
      other: ['', Validators.required],
    });
  }

  
  submit() {

    let name = this.formData.value.name;
    let other = this.formData.value.other;

    let filterParam = {
      name: name,
      other: other,
    };

    console.log(filterParam);
    // let api = 'transfer';
    // this.helperService.performPostRequest(api, filterParam)?.subscribe((res: any) => {
    //   if (res.status) {

    //   }
    // });

  }

}
