import { image } from 'ngx-bootstrap-icons';
import { Router } from '@angular/router';
import { UserFormService } from './../../user-form.service';
import { GoogleAuthService } from './../../google-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RightDialogComponent } from '../right-dialog/right-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { mimeType } from './mime-type.validator';
import { OpenImageComponent } from '../open-image/open-image.component';
import { AdminService } from 'src/app/adminWork/admin.service';
@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss'],
})
export class FormDetailComponent implements OnInit {
  userDetails: any;
  userDetail!: FormGroup;
  selectedFiles: any;
  imgUrl: any = '';
  fileName: any;
  display: string = '';
  imgView: boolean = false;
  foods: any = new Array();
  googleUserData: any;
  constructor(
    private GoogleAuthService: GoogleAuthService,
    private formService: UserFormService,
    public dialog: MatDialog,
    private afs: AdminService
  ) {}

  async ngOnInit() {
    this.userDetails = this.GoogleAuthService.userInformationFromGoogle();
    this.userDetail = new FormGroup({
      date: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      fever: new FormControl('', Validators.required),
      chBox: new FormControl([]),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.afs.getFoodList();
    this.getFoodDatachBox();
  }
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
  signOut(): void {
    this.GoogleAuthService.signOut();
  }
  get date() {
    return this.userDetail.get('date');
  }
  get gender() {
    return this.userDetail.get('gender');
  }
  get fever() {
    return this.userDetail.get('fever');
  }
  getCheckBoxControll(_name: any) {
    return this.userDetail.controls[_name].value;
  }
  setCheckBoxValue(_name: any, value: any) {
    this.userDetail.controls[_name].setValue(value);
  }
  onchangeInCheckBox($event: any, food: any) {
    let chArr = this.getCheckBoxControll('chBox') || [];
    if ($event.checked) {
      chArr = [...chArr, food];
    } else {
      chArr = (chArr || []).filter((_c: any) => _c != food);
    }
    this.setCheckBoxValue('chBox', chArr);
  }

  usersData() {
    if (this.userDetail.invalid) return;
    this.formService
      .setFormData(
        this.userDetails?.email,
        this.userDetail.value.date,
        this.userDetail.value.gender,
        this.userDetail.value.fever,
        this.userDetail.value.chBox,
        this.userDetail.value.image
      )
      .subscribe((res) => {});
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(RightDialogComponent, {
      disableClose: false,
      width: '30%',
    });
    setTimeout(() => {
      dialogRef.close(true);
    }, 1500);
    this.userDetail.reset();
    this.imgUrl = '';
  }

  uploadFileEvt(e: any) {
    const file = (e.target as HTMLInputElement).files![0];

    //image preview code
    let reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
    reader.readAsDataURL(file);
    //image priview code ends here

    //set the value to form controll
    this.userDetail.patchValue({ image: file });
    this.userDetail.get('image')?.updateValueAndValidity();
    this.imgView = true;
  }
  showImage() {
    const dialogRef = this.dialog.open(OpenImageComponent, {
      width: '500px',
      data: { src: this.imgUrl },
    });
  }

  getFoodDatachBox() {
    this.afs.foodListDB.subscribe(async (data: any) => {
      if (this.foods.length <= 0) {
        for (let i = 0; i < data?.length; i++) {
          await this.foods.push({ name: data[i].drink, checked: false });
        }
      }
    });
  }
}
