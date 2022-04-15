import { AdminService } from './../../adminWork/admin.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditFoodListpopUpComponent } from '../edit-food-listpop-up/edit-food-listpop-up.component';
@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss'],
})
export class DrinksListComponent implements OnInit, AfterContentInit {
  constructor(public afs: AdminService, private dialog: MatDialog) {
    // this.afs.getFoodList();
  }
  foodlist: any = new Array();
  spinnerRun: boolean = false;
  ngOnInit() {
    this.afs.getFoodList();
    this.spinnerRun = true;
  }
  ngAfterContentInit() {
    this.getFoodData();
  }
  getFoodData() {
    this.afs.foodListDB.subscribe((res: any) => {
      this.foodlist = res;
    });
    this.spinnerRun = false;
  }
  editDetails(i: number) {
    const dialogRef = this.dialog.open(EditFoodListpopUpComponent, {
      disableClose: false,
      data: {
        fdata: this.foodlist[i],
      },
    });
    this.spinnerRun = false;
  }

  Delete(i: number) {
    this.afs.deleteFoodList(this.foodlist[i]._id).subscribe(() => {
      console.log('deleted successfull');
    });
    this.spinnerRun = false;
  }
}
