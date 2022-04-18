import { RightDialogComponent } from './../right-dialog/right-dialog.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserFormService } from 'src/app/user-form.service';
import { mimeType } from '../form-detail/mime-type.validator';
import { AdminService } from 'src/app/adminWork/admin.service';
import { OpenImageComponent } from './../open-image/open-image.component';
@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent implements OnInit {
  userDetail: any;
  imgUrl: any = '';
  display: boolean = true;
  foods: any = [];
  constructor(
    public dialogRef: MatDialogRef<RightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ufs: UserFormService,
    public dialog: MatDialog,
    private afs: AdminService
  ) {}

  ngOnInit(): void {
    this.afs.getFoodList();
    this.getFoodDatachBox();
    let formFoodData: any = [];
    if (this.data.fdata.chBox.length <= 1) {
      formFoodData = this.data.fdata.chBox[0].split(',');
    } else {
      formFoodData = this.data.fdata.chBox;
    }

    this.userDetail = new FormGroup({
      date: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      fever: new FormControl('', Validators.required),
      chBox: new FormControl([], Validators.required),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.userDetail.controls['date'].setValue(this.data.fdata.date);
    this.userDetail.controls['gender'].setValue(this.data.fdata.gender);
    this.userDetail.controls['fever'].setValue(this.data.fdata.fever);
    this.userDetail.controls['chBox'].setValue(formFoodData);
    this.userDetail.controls['image'].setValue(this.data.fdata.img);

    this.imgUrl = this.data.fdata.img;

    this.foods.forEach((f: any) => {
      if (formFoodData.includes(f.name)) f.checked = true;
    });
  }

  ///after ng on init

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
  changeIncheckBox($event: any, food: string) {
    let arr = this.getCheckBoxControll('chBox') || [];
    if ($event.checked) {
      arr = [...arr, food];
    } else {
      arr = (arr || []).filter((_c: any) => _c != food);
    }
    this.setCheckBoxValue('chBox', arr);
  }
  usersData() {
    if (this.userDetail.invalid) return;
    this.ufs.updateFormDetails(
      this.data.fdata._id,
      this.userDetail.value.date,
      this.userDetail.value.gender,
      this.userDetail.value.fever,
      this.userDetail.value.chBox,
      this.userDetail.value.image
    );
    if (this.dialogRef) {
      this.dialogRef.close();
    }
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
    this.display = true;
  }

  //delete image from ui
  deleteImage() {
    this.imgUrl = '';
    this.display = false;
  }
  //show image in big size
  showImage() {
    const dialogRef = this.dialog.open(OpenImageComponent, {
      width: '1000px',
      data: { src: this.imgUrl },
    });
  }
  getFoodDatachBox() {
    this.afs.foodListDB.subscribe((data: any) => {
      if (this.foods.length <= 0) {
        for (let i = 0; i < data?.length; i++) {
          this.foods.push({ name: data[i].drink, checked: false });
          // console.log(i, 'index: ', data[i]);
        }
      }
    });
  }
}
