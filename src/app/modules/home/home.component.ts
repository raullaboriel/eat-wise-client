import { Component, OnInit } from '@angular/core';
import { IngredienBase, Meal } from './interfaces/home.interfaces';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  meals: Meal[] = [];

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getMeals().subscribe((data) => {
      console.log(data)
      this.meals = [...data];
    });
  }
}
