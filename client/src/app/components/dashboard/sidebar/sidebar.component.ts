import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  userTypes:any;
  st:boolean = true;

  ngOnInit(): void {
    sessionStorage.getItem('access_token');
    this.userTypes = sessionStorage.getItem('userType');

    if(this.userTypes == 'uploader') {
      this.st = true;
    } else {
      this.st = false;
    }
    console.log(this.userTypes);
  }

}
