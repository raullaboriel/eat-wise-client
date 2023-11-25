import { Component, Input } from '@angular/core';
import { Ingredient } from '../../interfaces/home.interfaces';

@Component({
  selector: 'meal-card-ingredient',
  templateUrl: './meal-card-ingredient.component.html',
  styleUrls: ['./meal-card-ingredient.component.scss']
})
export class MealCardIngredientComponent {
  @Input() ingredient!: Ingredient;
  @Input() totalCalories!: number;
  @Input() totalProteins!: number;
  @Input() totalCarbohydrates!: number;
  @Input() totalSugars!: number;
}
