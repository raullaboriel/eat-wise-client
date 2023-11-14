import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCardIngredientComponent } from './meal-card-ingredient.component';

describe('MealCardIngredientComponent', () => {
  let component: MealCardIngredientComponent;
  let fixture: ComponentFixture<MealCardIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCardIngredientComponent]
    });
    fixture = TestBed.createComponent(MealCardIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
