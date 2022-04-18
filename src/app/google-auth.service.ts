import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  usersInfo: any;
  constructor(private router: Router, private authService: SocialAuthService) {}

  googleLogIn() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      this.router.navigateByUrl('/dataList').then();
    });
  }
  userInformationFromGoogle() {
    const storage = localStorage.getItem('google_auth');
    if (storage) return JSON.parse(storage);
    else this.signOut();
  }
  signOut() {
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('').then();
  }
}
