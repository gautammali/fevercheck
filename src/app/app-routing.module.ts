import { AuthGuard } from './auth/auth.guard';
import { DrinksComponent } from './components/drinks/drinks.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { FormDetailComponent } from './components/form-detail/form-detail.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserdataListComponent } from './components/userdata-list/userdata-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'formdetail', component: FormDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dataList', component: UserdataListComponent },
  { path: 'drinks',canActivate:[AuthGuard], component: DrinksComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
//use export array for routing module and import that into the app module
//ecampleimport { LoginComponent } from './components/login/login.component';
// export const routingComponents=[FormDetailComponent];
