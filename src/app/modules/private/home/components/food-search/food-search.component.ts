import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food, SelectedFood } from '../../interfaces/home.interfaces';

@Component({
  selector: 'food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss']
})
export class FoodSearchComponent implements OnInit {
  @Input() selectedFoods!: SelectedFood[];
  @Output() selectedFoodsChange = new EventEmitter<SelectedFood[]>();

  foodSearchResultsVisible: boolean = false;

  toggleFoodSearchResults = () => this.foodSearchResultsVisible = !this.foodSearchResultsVisible;

  selectFood(food: Food) {
    const foodIndex = this.selectedFoods.findIndex(selectedFood => selectedFood.fdcId === food.fdcId);

    if (foodIndex > -1) { // If food is already selected, increment quantity
      this.selectedFoods[foodIndex].quantity += food.servingSize ? food.servingSize : 1;
      return;
    }

    this.selectedFoods = [...this.selectedFoods, {
      ...food,
      quantity: food.servingSize ? food.servingSize : 1,
      servingSize: food.servingSize
    }];

    this.selectedFoodsChange.emit(this.selectedFoods);
  }

  unselectFood(food: SelectedFood) {
    this.selectedFoods = this.selectedFoods.filter(selectedFood => selectedFood.fdcId !== food.fdcId);
    this.selectedFoodsChange.emit(this.selectedFoods);
  }

  foods: Food[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  query: string = '';

  toggleLoading = () => this.isLoading = !this.isLoading;

  loadData() {
    this.toggleLoading();

    this.foodService.getFood(this.pageNumber, this.query, this.pageSize).subscribe({
      next: response => this.foods = response,
      error: err => console.error(err),
      complete: () => this.toggleLoading()
    });
  }

  appendData() {
    this.toggleLoading();

    this.foodService.getFood(this.pageNumber, this.query, this.pageSize).subscribe({
      next: response => this.foods = [...this.foods, ...response],
      error: err => console.error(err),
      complete: () => this.toggleLoading()
    });
  }

  onScroll() {
    this.pageNumber++;
    this.appendData();
  }

  constructor(private foodService: FoodService, private zone: NgZone) { }

  onQueryChange(event: string) {
    this.query = event;
    this.pageNumber = 1;
    this.pageSize = 10;
    this.loadData();
  }


  ngOnInit(): void {
    this.loadData();
  }
}
