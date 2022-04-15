import { RightDialogComponent } from './../right-dialog/right-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AdminService } from 'src/app/adminWork/admin.service';
@Component({
  selector: 'app-edit-food-listpop-up',
  templateUrl: './edit-food-listpop-up.component.html',
  styleUrls: ['./edit-food-listpop-up.component.scss'],
})
export class EditFoodListpopUpComponent implements OnInit {
  constructor(
    private DialogRef: MatDialogRef<RightDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private afs: AdminService
  ) {}
  editFrom!: FormGroup;
  ngOnInit(): void {
    // console.log('=-==-=-=-=-=-=', this.data);

    this.editFrom = new FormGroup({
      drink: new FormControl(null, Validators.required),
    });
    this.editFrom.controls['drink'].setValue(this.data.fdata.drink);
  }
  myDrinks() {
    // console.log(this.editFrom.value.drink);
    let foodUpdatedData = {
      _id: this.data.fdata._id,
      email: this.data.fdata.email,
      drink: this.editFrom.value.drink,
    };
    this.afs.editFoodList(foodUpdatedData);
  }
}
