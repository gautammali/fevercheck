import { UserFormService } from './../../user-form.service';
import { GoogleAuthService } from './../../google-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userDetails: any;
  formDetails: any;
  constructor(
    private router: Router,
    private gas: GoogleAuthService,
    private ufs: UserFormService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.gas.userInformationFromGoogle();
    this.formDetails = this.ufs
      .getFormData(this.userDetails?.email)
      .subscribe((res) => {
        if (res?.length > 0) {
          this.formDetails = res[0];
        }
      });
  }
  signOut() {
    this.ufs.removeRedisData();
    localStorage.removeItem('google_auth');

    this.router.navigateByUrl('').then();
  }
  isLogedIn() {
    if (this.userDetails) {
      this.router.navigate(['dataList']);
    } else {
      this.signOut();
    }
  }
}
