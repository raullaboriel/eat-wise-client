import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCardIngredientSkeletonComponent } from './meal-card-ingredient-skeleton.component';

describe('MealCardIngredientSkeletonComponent', () => {
  let component: MealCardIngredientSkeletonComponent;
  let fixture: ComponentFixture<MealCardIngredientSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCardIngredientSkeletonComponent]
    });
    fixture = TestBed.createComponent(MealCardIngredientSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
