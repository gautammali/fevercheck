import { UserFormService } from 'src/app/user-form.service';
import { GoogleAuthService } from 'src/app/google-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private GoogleAuthService: GoogleAuthService) {}
  ngOnInit(): void {}
  googleSignIn(): void {
    this.GoogleAuthService.googleLogIn();
  }
}
