import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from '../../interfaces/home.interfaces';
import { getNutrientsProportion } from '../../../utils/private.utils';

@Component({
  selector: 'home-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {
  @Input() meal!: Meal;
  @Output() deleteMeal: EventEmitter<string> = new EventEmitter<string>();
  @Output() handleEditMeal: EventEmitter<Meal> = new EventEmitter<Meal>();
  getNutrientsProportion = getNutrientsProportion;

  mealNutrientsTotalsMap: Map<string, number> = new Map();

  constructor() { }

  roundNumber(number: number) {
    return Math.round(number);
  }

  ngOnInit(): void {
    this.meal.ingredients.forEach(ingredient => {
      ingredient.nutrients.forEach(nutrient => {
        this.mealNutrientsTotalsMap.set(nutrient.id, (this.mealNutrientsTotalsMap.get(nutrient.id) || 0) + getNutrientsProportion(ingredient, nutrient));
      });
    });
  }
}
