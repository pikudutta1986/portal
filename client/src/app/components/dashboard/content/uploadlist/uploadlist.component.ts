import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";

import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-uploadlist',
  templateUrl: './uploadlist.component.html',
  styleUrls: ['./uploadlist.component.css']
})
export class UploadlistComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'list', 'symbol'];
  // dataSource = ELEMENT_DATA;

  userData: any;

  responseData:any;
  dataSource: any;
  trsansferList:any;

  public totalItems: number = 0;
  public itemsPerPage: number = 10;
  public dataPage: number = 0;

  constructor(private helperservice: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.getUploadList();
  }

  getUploadList() {

    let api = 'getUploadList';

      let filterParam: any = {
        user_id: parseInt(this.userData)
      };
      this.helperservice.performPostRequest(api, filterParam)?.subscribe((response: any) => {
        if (response.status) {
          this.responseData = response.res;
          this.totalItems = this.responseData.length;       
          this.helperservice.getCurrentPageData(this.responseData, this.dataPage + 1, this.itemsPerPage).then((returnData: any) => {
           
            this.dataSource = new MatTableDataSource( returnData );
          });
          
        }
      });
  }

  changePage($event:any) 
  {
    console.log($event);
    this.dataPage = $event.pageIndex;
    this.itemsPerPage = $event.pageSize;

    this.helperservice.getCurrentPageData(this.responseData, this.dataPage + 1, this.itemsPerPage).then((returnData: any) => {
      this.dataSource = new MatTableDataSource(
            returnData
      );
    });
  }



}
