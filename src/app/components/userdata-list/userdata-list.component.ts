import { OpenImageComponent } from './../open-image/open-image.component';
import { UserFormService } from 'src/app/user-form.service';

import { MatDialog } from '@angular/material/dialog';
import { GoogleAuthService } from 'src/app/google-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormEditComponent } from '../form-edit/form-edit.component';
@Component({
  selector: 'app-userdata-list',
  templateUrl: './userdata-list.component.html',
  styleUrls: ['./userdata-list.component.scss'],
})
export class UserdataListComponent implements OnInit {
  details: any;
  spinnerRun: boolean = false;
  constructor(
    public ufs: UserFormService,
    private gas: GoogleAuthService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    let email = this.gas.userInformationFromGoogle()?.email;
    this.spinnerRun = true;
    this.ufs.getFormData(email).subscribe((data: any) => {
      let t1: any = JSON.parse(JSON.stringify(data));
      // console.log(t1);
      if (t1?.length > 0 && t1[0]?.chBox?.length <= 1)
        t1[0].chBox = t1[0]?.chBox[0]?.split(',');
      this.details = t1;
      this.spinnerRun = false;
    });
    this.ufs.getFormDatawithOb(email);
  }

  editDetails(i: number) {
    const dialogRef = this.dialog.open(FormEditComponent, {
      disableClose: false,
      data: {
        fdata: this.details[i],
      },
    });
  }
  showImg(i: number) {
    // console.log(this.details[i]);
    const dialogRef = this.dialog.open(OpenImageComponent, {
      width: '400px',
      data: { src: this.details[i]?.img },
    });
  }
  Delete(i: number) {
    this.ufs.DeleteData(this.details[i]._id);
  }
}
