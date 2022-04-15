import { UserFormService } from 'src/app/user-form.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RightDialogComponent } from '../components/right-dialog/right-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = 'http://localhost:5000';
  foodListDB: any = new BehaviorSubject(null);
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private ufs: UserFormService
  ) {}

  async setFoodList(email: string, food: string) {
    let foodList = {
      email: email,
      food: food,
    };
    this.http.post(`${this.baseUrl}/foodlist`, foodList).subscribe((res) => {});
    const dialogRef = this.dialog.open(RightDialogComponent, {
      disableClose: false,
    });
    await setTimeout(() => {
      dialogRef.close(true);
      this.router
        .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['drinks']);
        });
    }, 1500);
  }

  getFoodList() {
    this.http.get(`${this.baseUrl}/foolists`).subscribe((res) => {
      this.foodListDB.next(res);
    });
  }

  deleteFoodList(id: any): Observable<any> {
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['drinks']);
      });
    return this.http.delete(`${this.baseUrl}/food/${id}`);
  }

  editFoodList(updatedFoodData: any) {
    let updateData = {
      _id: updatedFoodData._id,
      email: updatedFoodData.email,
      drink: updatedFoodData.drink,
    };

    this.http
      .put<any>(`${this.baseUrl}/foodlist/upadte`, updateData)
      .subscribe(async (data) => {});
    const dialogRef = this.dialog.open(RightDialogComponent, {
      disableClose: false,
    });
    setTimeout(() => {
      dialogRef.close();
      window.location.reload();
      this.router
        .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['drinks']);
        });
    }, 1500);
  }
  
}
