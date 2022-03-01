
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

import { environment } from './../../../../../environments/environment';
declare var $: any;
declare var require: any;


@Component({
  selector: 'upload-content',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  usRegionStatus: boolean = false;

  formData: FormGroup;
  selectedFile: File;
  filePath: any;
  userData: any;

  downloaderList: any;
  attachedFileIds: any;


  bResponse: any = {
    Bucket: '',
    Etag: '',
    Location: '',
    key: '',
  };

  saveBtnResponse: any;
  chk: boolean = true;

  regionName: any = null;

  uploadId: any = null;

  userFormView: boolean = false;
  uploadFormView: boolean = true;

  constructor(private helperservice: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {

    this.formData = this.fb.group({
      downloaders: new FormArray([]),
    });

    this.userData = sessionStorage.getItem('userData');
    this.regionName = sessionStorage.getItem('regionType');
    this.saveBtnResponse = false;

  }

  default() {
    this.helperservice.showSiteLoader();
    this.getUsersByRegion(this.userData);
  }

  loader() {
    if (this.usRegionStatus) {
      this.helperservice.hideSiteLoader();
      this.usRegionStatus = false;
    }
  }

  ngAfterViewInit() {

  }


  getUsersByRegion(id: any) {

    let api = 'getDownloderByRegion';
    let filterParam: any = { id: parseInt(id) };
    this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {

      if (res.status) {
        this.downloaderList = res.message;
        this.regionName = res.message[0].name;
        this.addCheckboxesToForm(false);
        this.usRegionStatus = true;
        this.loader();
      }
    });
  }

  private addCheckboxesToForm(status: any) {
    this.downloaderList.forEach(() => this.ordersFormArray.push(new FormControl(status)));
  }

  get ordersFormArray() {
    return this.formData.controls.downloaders as FormArray;
  }

  onFileSelected(event: any) {

    this.filePath = event.target.value;
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    let api = 'fileUpload';
    let name = $("#name").val();
    if (name == '') {
      alert('Please Provide Name');
      return false;
    }
    if (this.selectedFile == undefined) {
      alert('Please Choose File');
      return false;
    }
    if (this.selectedFile.name != '' && name != '') {
      this.uploadFile(this.selectedFile);
    }

  }

  uploadFile(file: any) {

    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: environment.s3AccessKeyId,
        secretAccessKey: environment.s3SecretAccessKey,
        region: environment.s3Region
      }
    );
    const params = {
      Bucket: environment.s3Region,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    let name = $("#name").val();
    if (name != '') {

      this.helperservice.showSiteLoader();

      bucket.upload(params, (err: any, data: any) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          $('.msg').css('color', 'red');
          $('.msg').text('There was an error uploading your file to AWS S3');
          return false;
        }
        //$('.msg').css('color', 'green');
        //$('.msg').text('Successfully uploaded to AWS S3');

        this.bResponse.Bucket = data.Bucket;
        this.bResponse.Etag = data.Etag;
        this.bResponse.Key = data.Key;
        this.bResponse.Location = data.Location;
        this.saveBtnResponse = true;

        this.savePathToDb();

        return true;
      });

    }
    else {
      alert('provide name');
    }
  }

  savePathToDb() {

    let name = $("#name").val();
    if (name != '') {
      let api = 'uploadFilesToDb';
      let filterParam: any = {
        user_id: parseInt(this.userData),
        name: name,
        description: this.selectedFile.name,
        size: this.selectedFile.size,
        type: this.selectedFile.type,
        bucket: this.bResponse.Bucket,
        key: this.bResponse.key,
        location: this.bResponse.Location,
      };

      this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {
        if (res.status) {
          this.uploadId = res.id;
          $('.msg').css('color', 'green');
          $('.msg').text('Package created. Now select users you want to send');
          $("#name").val("");
          $("#file").val("");
          this.usRegionStatus = true;
          this.loader();
          this.uploadFormView = false;
          this.userFormView = true;
          this.default();
        }
      });
    }
  }

  submit() {

    const downloader_id = this.formData.value.downloaders
      .map((checked: any, i: string | number) => checked ? this.downloaderList[i].id : null)
      .filter((v: null) => v !== null);

    if (downloader_id.length > 0) {
      this.helperservice.showSiteLoader();
      let filterParam = {
        downloaderids: downloader_id,
        uploaderId: parseInt(this.userData),
        uploadId: parseInt(this.uploadId)
      };
      let api = 'transfer';
      this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {
        if (res.status) {
          this.uploadFormView = true;
          this.userFormView = false;
          $('.msg').css('color', 'green');
          $('.msg').text('Successfully sent to selected users.');
          this.usRegionStatus = true;
          this.loader();
        }
      });
    } else {
      alert('choose at least one user');
    }


  }



}
