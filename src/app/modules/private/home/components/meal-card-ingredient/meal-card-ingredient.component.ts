import { Component, Input } from '@angular/core';
import { Ingredient, Meal, Nutrient } from '../../interfaces/home.interfaces';

@Component({
  selector: 'meal-card-ingredient',
  templateUrl: './meal-card-ingredient.component.html',
  styleUrls: ['./meal-card-ingredient.component.scss']
})
export class MealCardIngredientComponent {
  @Input() ingredient!: Ingredient;
  @Input() meal!: Meal;
  @Input() nutrientsTotalsMap!: Map<string, number>;
  @Input() getNutrientsProportion!: (ingredient: Ingredient, nutrient: Nutrient) => number;
}