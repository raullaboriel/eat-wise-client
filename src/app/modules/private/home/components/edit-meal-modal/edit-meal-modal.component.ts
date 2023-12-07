import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient, Meal, Nutrient, SelectedFood } from '../../interfaces/home.interfaces';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-edit-meal-modal',
  templateUrl: './edit-meal-modal.component.html',
  styleUrls: ['./edit-meal-modal.component.scss']
})
export class EditMealModalComponent {
  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() meal!: Meal;
  @Output() editMeal: EventEmitter<Meal> = new EventEmitter<Meal>();

  isSavingChanges = false;

  constructor(private homeService: HomeService) { }

  selectedFoods: SelectedFood[] = [];

  getNutrientsProportion(food: SelectedFood, nutrient: Nutrient) {
    const amount = (nutrient.amount / (food.servingSize || 1)) * food.quantity;

    return amount;
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

  saveChanges() {
    this.isSavingChanges = true;
    this.homeService.editMeal({
      _id: this.meal.id,
      ingredients: this.selectedFoods.map(food => {
        return {
          fdcId: food.fdcId,
          amount: food.quantity,
        }
      })
    }).subscribe((addedMeal) => {
      this.editMeal.emit({
        id: addedMeal.id,
        date: addedMeal.date,
        ingredients: addedMeal.ingredients.map((ingredient): Ingredient => {
          const mealIngredientsDetailsMap: Map<number, SelectedFood> = new Map();

          this.selectedFoods.forEach(food => {
            mealIngredientsDetailsMap.set(food.fdcId, food);
          });

          return {
            id: ingredient.id,
            fdcId: ingredient.fdcId,
            amount: ingredient.amount,
            description: mealIngredientsDetailsMap.get(ingredient.fdcId)?.description || '',
            nutrients: mealIngredientsDetailsMap.get(ingredient.fdcId)?.nutrients || [],
            servingSize: mealIngredientsDetailsMap.get(ingredient.fdcId)?.servingSize,
            foodCategory: mealIngredientsDetailsMap.get(ingredient.fdcId)?.foodCategory || '',
            servingSizeUnit: mealIngredientsDetailsMap.get(ingredient.fdcId)?.servingSizeUnit || ''
          }
        })
      });

      this.visibleChange.emit(false);

      this.selectedFoods = [];
      this.isSavingChanges = false;
    })
  }

  onClose() {
    this.visibleChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.visibleChange.unsubscribe();
  }

  ngOnChanges() {
    this.selectedFoods = [];
    this.meal.ingredients.forEach(ingredient => {
      this.selectedFoods.push({
        fdcId: ingredient.fdcId,
        quantity: ingredient.amount,
        servingSize: ingredient.servingSize,
        description: ingredient.description,
        nutrients: ingredient.nutrients,
        foodCategory: ingredient.foodCategory,
        servingSizeUnit: ingredient.servingSizeUnit
      })
    });
  }
}