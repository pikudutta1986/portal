import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";

import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-refer-list',
  templateUrl: './refer-list.component.html',
  styleUrls: ['./refer-list.component.css']
})


export class ReferListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'status', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  userData: any;

  responseData:any;
  dataSource: any;
  public totalItems: number = 0;
  public itemsPerPage: number = 5;
  public dataPage: number = 0;

  constructor(private helperservice: HelperService, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.userData = sessionStorage.getItem('userData');
    this.getreferList();
    $('.msg').css('color', '');
    $('.msg').text('');
  }

  getreferList() {   

    this.helperservice.showSiteLoader();
      
    let api = 'referList';

      let filterParam: any = {
        userId: parseInt(this.userData)
      };
      this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {
        if (res.status) {
          this.responseData = res.message;
          this.totalItems = this.responseData.length;
          
          this.helperservice.getCurrentPageData(this.responseData, this.dataPage + 1, this.itemsPerPage).then((returnData: any) => {
           
            this.dataSource = new MatTableDataSource( returnData );
          });
          this.helperservice.hideSiteLoader();
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

  removeFromReferList(id:any) {

    var result = confirm("Want to delete?");
    if (result) {
      
      this.helperservice.showSiteLoader();
      
      let api = 'removeFromReferList';
  
      let filterParam: any = {
        accountsId: parseInt(id)
      };
  
      this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {
        if (res.status) {          
          $('.msg').css('color', 'red');
          $('.msg').text(res.message);
          this.getreferList();
        }
        // this.helperservice.hideSiteLoader();
      });
    }    

  }

  addNewBtnAction() {
    this.router.navigate(['/dashboard/refer']);
  }

}
