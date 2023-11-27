import { Component, OnInit } from '@angular/core';
import { Meal } from './interfaces/home.interfaces';
import { HomeService } from './services/home.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  isAddMealModalVisible: boolean = false;
  isLoading: boolean = true;

  constructor(
    private homeService: HomeService,
    private messageService: MessageService
  ) { }

  showAddMealModal(): void {
    this.isAddMealModalVisible = true;
  }

  addMeal(meal: Meal): void {
    this.meals.push(meal);
  }

  deleteMeal(mealId: string): void {
    this.homeService.deleteMeal(mealId).subscribe(() => {
      this.meals = this.meals.filter((meal) => meal.id !== mealId);
      this.messageService.add({
        severity: 'success',
        summary: 'Comida eliminada',
      })
    })
  }

  onDialogClose(event: any) {
    this.isAddMealModalVisible = event;
  }

  ngOnInit(): void {
    console.log('hello');

    this.homeService.getMeals().subscribe((data) => {
      this.meals = data;
      this.isLoading = false;
    });
  }
}
