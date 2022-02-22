import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-referal',
  templateUrl: './referal.component.html',
  styleUrls: ['./referal.component.css']
})

export class ReferalComponent implements OnInit {

  formData: FormGroup;
  userId: any;

  constructor(private helperService: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      email: [ '', Validators.required],
    });
    this.userId = sessionStorage.getItem('userData');
  }

  submit() {

    let email = this.formData.value.email;
    // let other = this.formData.value.other;

    let filterParam = {
      email: email,
      userId: parseInt(this.userId)
      // other: other,
    };

    console.log(filterParam);
    let api = 'refer';
    this.helperService.performPostRequest(api, filterParam)?.subscribe((res: any) => {
      if (res.status) {
        console.log(res);
      }
    });

  }

}
