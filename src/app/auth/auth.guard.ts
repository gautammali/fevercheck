import { UserFormService } from 'src/app/user-form.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { GoogleAuthService } from '../google-auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  Isadmin: any = '';
  constructor(
    private gas: GoogleAuthService,
    private ufs: UserFormService,
    private router: Router
  ) {
    this.ufs.userdata.subscribe((data) => {
      let d = data;
      if (d) {
        this.Isadmin = d[0]?.role;
      }
    });
  }

  canActivate() {
    if (this.Isadmin === 'admin') {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
