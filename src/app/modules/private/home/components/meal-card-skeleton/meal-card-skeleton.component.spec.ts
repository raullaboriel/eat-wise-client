import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCardSkeletonComponent } from './meal-card-skeleton.component';

describe('MealCardSkeletonComponent', () => {
  let component: MealCardSkeletonComponent;
  let fixture: ComponentFixture<MealCardSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCardSkeletonComponent]
    });
    fixture = TestBed.createComponent(MealCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
