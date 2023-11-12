import { Component } from '@angular/core';

@Component({
  selector: 'meal-card-ingredient-skeleton',
  templateUrl: './meal-card-ingredient-skeleton.component.html',
  styleUrls: ['./meal-card-ingredient-skeleton.component.scss']
})
export class MealCardIngredientSkeletonComponent {
  width: string = `${Math.floor(Math.random() * 8) + 4}rem`;
}
