import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../../interfaces/home.interfaces';

@Component({
  selector: 'home-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {
  @Input() meal!: Meal;
  nutrientsTotalsMap: Map<string, number> = new Map();

  constructor() { }

  ngOnInit(): void {
    this.meal.ingredients.forEach(ingredient => {
      ingredient.nutrients.forEach(nutrient => {
        this.nutrientsTotalsMap.set(nutrient.id, (this.nutrientsTotalsMap.get(nutrient.id) || 0) + nutrient.amount);
      });
    });
  }
}
