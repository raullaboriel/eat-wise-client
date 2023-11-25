import { Component, OnInit } from '@angular/core';
import { Meal } from './interfaces/home.interfaces';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];
  isAddMealModalVisible: boolean = false;
  isLoading: boolean = true;

  showAddMealModal(): void {
    this.isAddMealModalVisible = true;
  }

  onDialogClose(event: any) {
    this.isAddMealModalVisible = event;
  }

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getMeals().subscribe((data) => {
      this.meals = [...data];
      this.isLoading = false;
    });
  }
}
