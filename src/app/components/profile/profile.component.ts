import { UserFormService } from './../../user-form.service';
import { GoogleAuthService } from './../../google-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  dbDetails:any;
  public userDetails: any;
  now = Date.now();

  constructor(private router: Router, private AuthService: GoogleAuthService,private ufs:UserFormService) {}

  ngOnInit(): void {
    this.ufs.userdata.subscribe(d=>{
      // console.log(d);
      this.dbDetails=d[0];
    });
    this.userDetails = this.AuthService.userInformationFromGoogle();
    setTimeout(() => {
      this.signOut();
      this.router.navigate(['login']);
    }, 50000);
  }
  signOut(): void {
    this.AuthService.signOut();
  }

}
