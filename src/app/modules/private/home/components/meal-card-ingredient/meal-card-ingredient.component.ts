import { Component, Input, OnInit } from '@angular/core';
import { IngredienBase, Ingredient } from '../../interfaces/home.interfaces';
import { HomeService } from '../../services/home.service';

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
