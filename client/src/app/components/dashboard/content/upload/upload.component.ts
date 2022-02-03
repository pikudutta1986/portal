
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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
  selectedFile:File;
  filePath:any;
  FOLDER = '/images';

  constructor(private helperservice: HelperService,public fb: FormBuilder) { }
  
  ngOnInit(): void {

    this.formData = this.fb.group({
      username: '',
    });

  }
  
  onFileSelected(event:any) {
    
    this.filePath = event.target.value;
    this.selectedFile = event.target.files[0];
    console.log(event);   

  }  

  onUpload() {

    let api = 'fileUpload';
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('userId', '2');
    // this.helperservice.sendChunk(api,fd)?.subscribe((res) => {
    //   console.log(res);
    // });
    this.uploadFile(this.selectedFile);
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

    console.log(contentType,params);
    
    bucket.upload(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        $('.msg').css('color', 'red');
        $('.msg').text('There was an error uploading your file to AWS S3');
        return false;
      }
      $('.msg').css('color', 'green');
      $('.msg').text('Successfully uploaded to AWS S3');
      console.log('Successfully uploaded file.', data);
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
 
}
