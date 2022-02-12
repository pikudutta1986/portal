
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

declare var $: any;
declare var require: any;


@Component({
  selector: 'upload-content',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  formData: FormGroup;
  selectedFile: File;
  filePath: any;
  FOLDER = '/images';
  userData: any;

  downloaderList: any;


  bResponse: any = {
    Bucket: '',
    Etag: '',
    Location: '',
    key: '',
  };

  saveBtnResponse: any;

  constructor(private helperservice: HelperService, public fb: FormBuilder) { }

  ngOnInit(): void {

    this.formData = this.fb.group({
      downloaders: new FormArray([]),
    });

    this.userData = sessionStorage.getItem('userData');
    this.saveBtnResponse = false;
    $("#saveBtn").hide();
    console.log('userData', this.userData);
    this.getUsersByRegion(this.userData);

  }

  ngAfterViewInit() {    
    // this.addCheckboxesToForm();
  }

  private addCheckboxesToForm() {
    this.downloaderList.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  get ordersFormArray() {
    return this.formData.controls.downloaders as FormArray;
  }
  
  onFileSelected(event: any) {

    this.filePath = event.target.value;
    this.selectedFile = event.target.files[0];

    console.log(event);

  }

  onUpload() {

    let api = 'fileUpload';
    console.log(this.selectedFile);
    // const fd = new FormData();
    // fd.append('file', this.selectedFile, this.selectedFile.name);
    // fd.append('userId', '2');
    // this.helperservice.sendChunk(api,fd)?.subscribe((res) => {
    //   console.log(res);
    // });
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

    console.log(this.filePath);
  }

  uploadFile(file: any) {
    const contentType = file.type;

    const bucket = new S3(
      {
        accessKeyId: 'AKIA3A3Q7T2RPTYUED6V',
        secretAccessKey: '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',
        region: 'ap-south-1'
      }
    );
    const params = {
      Bucket: 'anindyas3',
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };

    console.log(contentType, params);

    bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        $('.msg').css('color', 'red');
        $('.msg').text('There was an error uploading your file to AWS S3');
        return false;
      }
      $('.msg').css('color', 'green');
      $('.msg').text('Successfully uploaded to AWS S3');
      console.log('Successfully uploaded file.', data);
      this.bResponse.Bucket = data.Bucket;
      this.bResponse.Etag = data.Etag;
      this.bResponse.Key = data.Key;
      this.bResponse.Location = data.Location;
      this.saveBtnResponse = true;

      if (this.saveBtnResponse) {
        $("#saveBtn").show();
      } else {
        $("#saveBtn").hide();
      }
      return true;
    });
    //for upload progress   
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
              console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
              if (err) {
                  console.log('There was an error uploading your file: ', err);
                  return false;
              }
              console.log('Successfully uploaded file.', data);
              return true;
            });*/


  }

  getUsersByRegion(id: any) {

    let api = 'getDownloderByRegion';
    let filterParam: any = { id: parseInt(id) };
    this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {

      if (res.status) {
        this.downloaderList = res.message;
        this.addCheckboxesToForm();       
        console.log(this.downloaderList);
      }
    });
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
      console.log(filterParam);
      this.helperservice.performPostRequest(api, filterParam)?.subscribe((res: any) => {
        if (res.status) {
          console.log(res);
          $('.msg').css('color', 'green');
          $('.msg').text('Successfully uploaded to Server');
        }
      });
    } else {
      alert('provide name');
    }


  }

  submit() {

    const downloader_id = this.formData.value.downloaders
      .map((checked: any, i: string | number) => checked ? this.downloaderList[i].id : null)
      .filter((v: null) => v !== null);

    if(downloader_id.length > 0) {
      let filterParam = {
        downloaderids: downloader_id,
        uploaderId: parseInt(this.userData)
      };
      console.log(filterParam);
    } else {
      alert('choose at least one user');
    }
    
   

  }

}
