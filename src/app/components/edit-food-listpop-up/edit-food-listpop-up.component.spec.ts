import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoodListpopUpComponent } from './edit-food-listpop-up.component';

describe('EditFoodListpopUpComponent', () => {
  let component: EditFoodListpopUpComponent;
  let fixture: ComponentFixture<EditFoodListpopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFoodListpopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodListpopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
