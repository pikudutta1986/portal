
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

// var s3:any;
// import s3 from 's3';
// var s3 = require('s3');

@Component({
  selector: 'upload-content',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  formData: FormGroup;
  selectedFile:File;
  filePath:any;
  FOLDER = '';

  constructor(private helperservice: HelperService,public fb: FormBuilder) { }
  
  ngOnInit(): void {

    this.formData = this.fb.group({
      username: '',
    });

  }

  submitForm() {

  }

  onFileSelected(event:any) {
    
    this.filePath = event.target.value;
    this.selectedFile = event.target.files[0];
    console.log(event);
    

  }

  
  // s3Upload(path:any) {

  //   var client = s3.createClient({
  //     maxAsyncS3: 20,     // this is the default
  //     s3RetryCount: 3,    // this is the default
  //     s3RetryDelay: 1000, // this is the default
  //     multipartUploadThreshold: 20971520, // this is the default (20 MB)
  //     multipartUploadSize: 15728640, // this is the default (15 MB)
  //     s3Options: {
  //       accessKeyId: "AKIA3A3Q7T2RPTYUED6V",
  //       secretAccessKey: "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",
  //       // any other options are passed to new AWS.S3()
  //       // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  //     },
  //   });
  //   var params = {
  //     localFile: path,
     
  //     s3Params: {
  //       Bucket: "anindyas3",
  //       Key: "some/remote/file",
  //       // other options supported by putObject, except Body and ContentLength.
  //       // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
  //     },
  //   };
  //   var uploader = client.uploadFile(params);
  //   uploader.on('error', function(err:any) {
  //     console.error("unable to upload:", err.stack);
  //   });
  //   uploader.on('progress', function() {
  //     console.log("progress", uploader.progressMd5Amount,
  //               uploader.progressAmount, uploader.progressTotal);
  //   });
  //   uploader.on('end', function() {
  //     console.log("done uploading");
  //   });
  // }

  onUpload() {

    let api = 'fileUpload';
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('userId', '2');
    // this.helperservice.sendChunk(api,fd)?.subscribe((res) => {
    //   console.log(res);
    // });
    // this.uploadFile(this.selectedFile);
    console.log(this.filePath);
  }

  // uploadFiles(event:any) {

  //   let BYTES_PER_CHUNK = parseInt('2097152', 10);
  //   let size = event.target.files[0].size;
  //   let name = event.target.files[0].name;
  //   let type = event.target.files[0].type;
  //   let NUM_CHUNKS = Math.max(Math.ceil(size / BYTES_PER_CHUNK), 1);

  //   let start = 0; 
  //   let end = BYTES_PER_CHUNK; 
  //   let num = 1;

  //   console.log(size,name,type);

  //   let fd:any = new FormData();  
  //   fd.append("num", num);
  //   fd.append("num_chunks", NUM_CHUNKS); 
  //   fd.append('file', event.target.files[0]);

  //   let api = 'fileUpload';
    
  //   let ts = JSON.stringify(Object.fromEntries(fd));
    
  //   this.helperservice.sendChunk(api,ts)?.subscribe((res) => {
  //     console.log(res);
  //   });
  
  //   // var chunkUpload = (blob:any) => {
      
      
  //   // };
  
  //   // while (start < size) {
  //   //   chunkUpload(file.target.files[0].slice(start, end));
  //   //   start = end;
  //   //   end = start + BYTES_PER_CHUNK;
  //   //   num++;
  //   // }
  // }

  // uploadFile(file: any) {
  //   const contentType = file.type;
  //   const bucket = new S3(
  //     {
  //       accessKeyId: 'AKIA3A3Q7T2RPTYUED6V',
  //       secretAccessKey: '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',
  //       region: 'us-east-2'
  //     }
  //   );
  //   const params = {
  //     Bucket: 'anindyas3',
  //     Key: this.FOLDER + file.name,
  //     Body: file,
  //     ACL: 'public-read',
  //     ContentType: contentType
  //   };
  //   bucket.upload(params, function (err: any, data: any) {
  //     if (err) {
  //       console.log('There was an error uploading your file: ', err);
  //       return false;
  //     }
  //     console.log('Successfully uploaded file.', data);
  //     return true;
  //   });
  //   //for upload progress   
  //   /*bucket.upload(params).on('httpUploadProgress', function (evt) {
  //             console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
  //         }).send(function (err, data) {
  //             if (err) {
  //                 console.log('There was an error uploading your file: ', err);
  //                 return false;
  //             }
  //             console.log('Successfully uploaded file.', data);
  //             return true;
  //         });*/
  // }

}
