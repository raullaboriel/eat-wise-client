import { Component, OnInit, NgZone } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { Food } from '../../interfaces/home.interfaces';
import { LazyLoadEvent } from 'primeng/api';
import { VirtualScrollerLazyLoadEvent } from 'primeng/virtualscroller';

@Component({
  selector: 'food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.scss']
})
export class FoodSearchComponent implements OnInit {
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
