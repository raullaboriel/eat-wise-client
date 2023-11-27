import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient, Meal, Nutrient, SelectedFood } from '../../interfaces/home.interfaces';
import { HomeService } from '../../services/home.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'add-meal-modal',
  templateUrl: './add-meal-modal.component.html',
  styleUrls: ['./add-meal-modal.component.scss']
})
export class AddMealModalComponent {
  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter();
  @Output() addMeal: EventEmitter<Meal> = new EventEmitter<Meal>();

  isSavingMeal: boolean = false;

  selectedFoods: SelectedFood[] = [];

  nutrientsTotalsMap: Map<string, number> = new Map();

  constructor(
    private homeService: HomeService,
    private messageService: MessageService
  ) { }

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

  saveMeal() {
    this.isSavingMeal = true;
    this.homeService.addMeal({
      ingredients: this.selectedFoods.map(food => {
        return {
          fdcId: food.fdcId,
          amount: food.quantity,
        }
      })
    }).subscribe((addedMeal) => {
      this.addMeal.emit({
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
            servingSize: mealIngredientsDetailsMap.get(ingredient.fdcId)?.servingSize
          }
        })
      });

      this.visibleChange.emit(false);

      this.messageService.add({
        severity: 'success',
        summary: 'Comida guardada',
        detail: 'Comida guardada con éxito'
      });

      this.selectedFoods = [];
      this.isSavingMeal = false;
      this.nutrientsTotalsMap = new Map();
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
