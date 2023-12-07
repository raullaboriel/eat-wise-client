import { Component, OnInit } from '@angular/core';
import { Meal, Nutrient } from './interfaces/home.interfaces';
import { HomeService } from './services/home.service';
import { MessageService } from 'primeng/api';
import { User } from '../../public/interfaces/public.interfaces';
import { getNutrientsProportion } from '../utils/private.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  isAddMealModalVisible: boolean = false;
  isEditMealModalVisible: boolean = false;
  isLoading: boolean = true;
  user!: User;
  todayCalories: number = 0;

  selectedMeal: Meal | null = null;

  handleEditMeal(meal: Meal) {
    this.selectedMeal = meal;
    this.isEditMealModalVisible = true;
  }

  editMeal(updatedMeal: Meal) {
    this.meals = this.meals.map((meal) => {
      if (updatedMeal.id === meal.id) {
        return {
          ...meal,
          ...updatedMeal,
        };
      };

      return meal;
    });

    this.calculateTodayCalories();
  }

  calculateTodayCalories() {
    this.todayCalories = 0;
    this.meals.forEach((meal) => {
      //check if meal is today
      if (meal.date.toDateString() === new Date().toDateString()) {
        meal.ingredients.forEach((ingredient) => {
          this.todayCalories += getNutrientsProportion(ingredient, ingredient.nutrients[0]);
        })
      }
    });
  }

  getAbsoluteCalories(calories: number): number {
    return Math.abs(calories);
  }

  getCaloriesGraphSubtitle() {
    if ((this.user.goal - this.todayCalories) < 0) return 'Excedidas';

    return 'Restantes';
  }

  constructor(
    private homeService: HomeService,
    private messageService: MessageService,
  ) {
    //get user from localstorage
    const user = localStorage.getItem('user');
    this.user = JSON.parse(user!);
  }

  showAddMealModal(): void {
    this.isAddMealModalVisible = true;
  }

  addMeal(meal: Meal): void {
    this.meals.push(meal);

    this.calculateTodayCalories();
  }

  deleteMeal(mealId: string): void {
    this.homeService.deleteMeal(mealId).subscribe(() => {
      this.meals = this.meals.filter((meal) => meal.id !== mealId);
      this.messageService.add({
        severity: 'success',
        summary: 'Comida eliminada',
      })
      this.calculateTodayCalories();
    })
  }

  onAddMealModalClose(event: boolean) {
    this.isAddMealModalVisible = event;
  }

  onEditMealModalClose(event: boolean) {
    this.isEditMealModalVisible = event;
  }

  ngOnInit(): void {
    this.homeService.getMeals().subscribe((data) => {
      this.meals = data;

      this.calculateTodayCalories();
      this.isLoading = false;
    });
  }
}
