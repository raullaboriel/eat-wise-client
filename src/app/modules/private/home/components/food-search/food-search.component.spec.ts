import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSearchComponent } from './food-search.component';

describe('FoodSearchComponent', () => {
  let component: FoodSearchComponent;
  let fixture: ComponentFixture<FoodSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodSearchComponent]
    });
    fixture = TestBed.createComponent(FoodSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
