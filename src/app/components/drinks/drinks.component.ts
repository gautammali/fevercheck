import { AdminService } from './../../adminWork/admin.service';
import { GoogleAuthService } from 'src/app/google-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  drinksForm!: FormGroup;
  constructor(private gas:GoogleAuthService,private afs:AdminService) {}

  ngOnInit(): void {
    this.drinksForm = new FormGroup({
      drink: new FormControl('', Validators.required),
    });
  }
  
  myDrinks() {
    let food=this.drinksForm.value.drink;
    let email=this.gas.userInformationFromGoogle().email;
    this.afs.setFoodList(email,food);
    this.drinksForm.reset();
  }
}
