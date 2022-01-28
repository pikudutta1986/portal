import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// IMPORTING THE ANGULAR MODULES FOR DOING OPERATIONS ON URL.
import { Router } from "@angular/router";
import { HelperService } from '../../../../services/helper.service';

declare var $: any;

@Component({
  selector: 'upload-content',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {

  formData: FormGroup;

  constructor(private helperservice: HelperService,public fb: FormBuilder) { }
  
  ngOnInit(): void {

    this.formData = this.fb.group({
      username: '',
    });
  }

  submitForm() {

  }

  uploadFile(event:any) {

    let BYTES_PER_CHUNK = parseInt('2097152', 10);
    let size = event.target.files[0].size;
    let name = event.target.files[0].name;
    let type = event.target.files[0].type;
    let NUM_CHUNKS = Math.max(Math.ceil(size / BYTES_PER_CHUNK), 1);

    let start = 0; 
    let end = BYTES_PER_CHUNK; 
    let num = 1;

    console.log(size,name,type);

    let fd:any = new FormData();  
    fd.append("num", num);
    fd.append("num_chunks", NUM_CHUNKS); 
    fd.append('file', event.target.files[0]);

    let api = 'fileUpload';
    
    let ts = JSON.stringify(Object.fromEntries(fd));
    
    this.helperservice.sendChunk(api,ts)?.subscribe((res) => {
      console.log(res);
    });
  
    // var chunkUpload = (blob:any) => {
      
      
    // };
  
    // while (start < size) {
    //   chunkUpload(file.target.files[0].slice(start, end));
    //   start = end;
    //   end = start + BYTES_PER_CHUNK;
    //   num++;
    // }
  }

}
