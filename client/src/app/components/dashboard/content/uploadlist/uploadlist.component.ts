import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from "@angular/material/table";

import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-uploadlist',
  templateUrl: './uploadlist.component.html',
  styleUrls: ['./uploadlist.component.css']
})
export class UploadlistComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'list', 'symbol'];
  // dataSource = ELEMENT_DATA;
  uploadListStatus:boolean = false;

  formData: FormGroup;

  userData: any;

  responseData:any;
  dataSource: any;
  trsansferList:any;

  public totalItems: number = 0;
  public itemsPerPage: number = 5;
  public dataPage: number = 0;

  downloaderList: any;
  chk: boolean = true;

  constructor(private helperservice: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.default();
    this.formData = this.fb.group({
      fileName: [''],
      fileDescription: [],
      uploadId: [''],
      downloaders: new FormArray([]),
    });
    
  }

  ngAfterViewInit() {        
    
  }

  default() {
    this.helperservice.showSiteLoader();
    this.getUploadList();
  }

  loader() 
  {
    if(this.uploadListStatus) 
    {
      this.helperservice.hideSiteLoader();
      this.uploadListStatus = false;
    }
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
            this.uploadListStatus = true;
            this.loader();
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

  get ordersFormArray() {
    return this.formData.controls.downloaders as FormArray;
  }

  
  getDownloaders(event:any) {
    
    if(parseInt(event.id)) {

      $('.tMsg').css('color', '');
      $('.tMsg').text('');

      $('#myModal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
      });
     
      this.downloaderList = '';
      this.ordersFormArray.controls = [];
      this.chk = false;

      this.formData.controls.fileName.setValue(event.name);
      this.formData.controls.fileDescription.setValue(event.description);
      this.formData.controls.uploadId.setValue(event.id);


      let api = 'getDownloaders';
      let filterParam: any = {
        user_id: parseInt(this.userData),
        uploadId: parseInt(event.id),
      };

      this.helperservice.showSiteLoader();

      this.helperservice.performPostRequest(api, filterParam)?.subscribe((response: any) => {
       
        this.downloaderList = response.res;
        this.downloaderList.forEach( (x:any) => {
          console.log(x);
          this.chk = true;
          this.ordersFormArray.push(new FormControl(x.checked));
        });
        this.uploadListStatus = true;
        this.loader();
        
      });
    }
    
  }

  submit() {

    this.helperservice.showSiteLoader();

    const downloader_id = this.formData.value.downloaders
      .map((checked: any, i: string | number) => checked ? this.downloaderList[i].id : null)
      .filter((v: null) => v !== null);
      
    let uploadId = parseInt(this.formData.value.uploadId);    

    if(uploadId) {

      let filterParam = {
        downloaderids: downloader_id,
        uploaderId: parseInt(this.userData),
        uploadId: uploadId,
        fileName: this.formData.value.fileName,
        fileDescription: this.formData.value.fileDescription,
      };
      let api = 'updateUserAccess';
      this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {
        if (res.status) {
          $('.tMsg').css('color', 'green');
          $('.tMsg').text('Successfully Updated');           
        }
        this.uploadListStatus = true;
        this.loader();
      });

    }

  }  

  close() {
    this.default();
  }



}
