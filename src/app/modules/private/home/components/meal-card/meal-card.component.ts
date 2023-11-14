import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../../interfaces/home.interfaces';

@Component({
  selector: 'home-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {
  @Input() meal!: Meal;
  totalCalories: number = 0;
  totalProteins: number = 0;
  totalCarbohydrates: number = 0;
  totalSugars: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.totalCalories = this.meal.ingredients.reduce((acc, ingredient) => acc + ingredient.nutrients.calories.amount, 0);
    this.totalProteins = this.meal.ingredients.reduce((acc, ingredient) => acc + ingredient.nutrients.proteins.amount, 0);
    this.totalCarbohydrates = this.meal.ingredients.reduce((acc, ingredient) => acc + ingredient.nutrients.carbohydrates.amount, 0);
    this.totalSugars = this.meal.ingredients.reduce((acc, ingredient) => acc + ingredient.nutrients.sugars.amount, 0);
  }

}
