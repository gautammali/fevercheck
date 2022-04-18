import { UserdataListComponent } from './../userdata-list/userdata-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-open-image',
  templateUrl: './open-image.component.html',
  styleUrls: ['./open-image.component.scss']
})
export class OpenImageComponent implements OnInit {
  imgUrl:string='';
  constructor(public dialogRef: MatDialogRef<UserdataListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log(this.data?.src);
    this.imgUrl=this.data?.src
  }

}
