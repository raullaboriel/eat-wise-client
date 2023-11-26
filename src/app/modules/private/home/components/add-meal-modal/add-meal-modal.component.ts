import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food, Nutrient, SelectedFood } from '../../interfaces/home.interfaces';

@Component({
  selector: 'add-meal-modal',
  templateUrl: './add-meal-modal.component.html',
  styleUrls: ['./add-meal-modal.component.scss']
})
export class AddMealModalComponent {
  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter();

  selectedFoods: SelectedFood[] = [];

  nutrientsTotalsMap: Map<string, number> = new Map();

  constructor() { }

  ngOnChange(): void {
    this.selectedFoods.forEach(food => {
      food.nutrients.forEach(nutrient => {
        this.nutrientsTotalsMap.set(nutrient.id, (this.nutrientsTotalsMap.get(nutrient.id) || 0) + nutrient.amount);
      });
    });
  }

  unselectFood(food: SelectedFood) {
    this.selectedFoods = this.selectedFoods.filter(selectedFood => selectedFood.fdcId !== food.fdcId);
  }

  changeFoodQuantity(food: SelectedFood, quantity: number) {
    if (food.quantity === 1 && quantity === -1) {
      this.unselectFood(food);
      return;
    }

    this.selectedFoods = this.selectedFoods.map(selectedFood => {
      if (selectedFood.fdcId === food.fdcId) {
        return {
          ...selectedFood,
          quantity: selectedFood.quantity + quantity
        }
      }

      return selectedFood;
    })
  }

  getNutrientsProportion(food: SelectedFood, nutrient: Nutrient) {
    const amount = (nutrient.amount / (food.servingSize || 1)) * food.quantity;

    return amount;
  }

  onClose() {
    this.visibleChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.visibleChange.unsubscribe();
  }
}
