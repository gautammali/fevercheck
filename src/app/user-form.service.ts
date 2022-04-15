import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RightDialogComponent } from './components/right-dialog/right-dialog.component';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  baseUrl = 'http://localhost:5000';
  FormDetails: any;
  backendData: any;
  userdata: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router
  ) {}
  setFormData(
    email: string,
    date: Date,
    gender: string,
    fever: string,
    chBox: any,
    image: File
  ): Observable<any> {
    const formData = {
      id: '',
      email: email,
      date: date,
      gender: gender,
      fever: fever,
      chBox: chBox,
    };

    let form = new FormData();
    form.append('id', '');
    form.append('email', email);
    form.append('date', date.toUTCString());
    form.append('gender', gender);
    form.append('fever', fever);
    form.append('chBox', chBox);
    form.append('image', image, image.name);

    return this.http.post<any>(`${this.baseUrl}/send`, form);
    // .subscribe((responData) => {});
  }

  getFormDatawithOb(email: string) {
    let query = new HttpParams().append('email', email);
    this.http
      .get(`${this.baseUrl}/data`, { params: query })
      .subscribe((data) => {
        this.userdata.next(data);
      });
  }
  getFormData(email: string): Observable<any> {
    let query = new HttpParams().append('email', email);
    return this.http.get(`${this.baseUrl}/data`, { params: query });
  }
  //update Form
  updateFormDetails(
    id: string,
    date: Date,
    gender: string,
    fever: string,
    chBox: any,
    image: File | string
  ) {
    let formData;
    if (typeof image === 'object') {
      formData = new FormData();
      formData.append('date', new Date(date).toUTCString());
      formData.append('gender', gender);
      formData.append('fever', fever);
      formData.append('chBox', chBox);
      formData.append('image', image, image.name);
    } else {
      formData = {
        id: id,
        date: date,
        gender: gender,
        fever: fever,
        chBox: chBox,
        image: image,
      };
    }

    this.http
      .put<void>(`${this.baseUrl}/form/${id}`, formData)
      .subscribe((responData) => {
        const refdailog = this.dialog.open(RightDialogComponent, {
          disableClose: false,
        });
        setTimeout(() => {
          refdailog.close(true);
          this.router
            .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['dataList']);
            });
        }, 1500);
      });
  }
  DeleteData(id: any) {
    this.http
      .delete(`${this.baseUrl}/form/${id}`)
      .subscribe(() => console.log('Delete successful'));
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['dataList']);
      });
  }

  removeRedisData() {
    this.http.get(`${this.baseUrl}/logout`).subscribe((d) => {
      console.log('logout');
    });
  }
}
