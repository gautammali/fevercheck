import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightDialogComponent } from './right-dialog.component';

describe('RightDialogComponent', () => {
  let component: RightDialogComponent;
  let fixture: ComponentFixture<RightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
