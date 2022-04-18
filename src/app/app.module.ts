import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
//if have multiple routes than create array in app routing module and import here
import { FormDetailComponent } from './components/form-detail/form-detail.component';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ProfileComponent } from './components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderStyleDirective } from './directives/header-style.directive';
import { FooterComponent } from './components/footer/footer.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { UserdataListComponent } from './components/userdata-list/userdata-list.component';
import { RightDialogComponent } from './components/right-dialog/right-dialog.component';
import { FormEditComponent } from './components/form-edit/form-edit.component';
import { OpenImageComponent } from './components/open-image/open-image.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { DrinksListComponent } from './components/drinks-list/drinks-list.component';
import { EditFoodListpopUpComponent } from './components/edit-food-listpop-up/edit-food-listpop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FormDetailComponent,
    ProfileComponent,
    PageNotFoundComponent,
    HeaderStyleDirective,
    FooterComponent,
    UserdataListComponent,
    RightDialogComponent,
    FormEditComponent,
    OpenImageComponent,
    DrinksComponent,
    DrinksListComponent,
    EditFoodListpopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatNativeDateModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '125449156-jtmgdt0r9opnb5cjem864g00cds6h6ta.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
