import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, FDC_API_KEY, FDC_BASE_URL } from 'src/app/config/constants/config.constants';
import { Food, IngredienBase, Ingredient, Meal } from '../interfaces/home.interfaces';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(private http: HttpClient) { }

  getFood(pageNumber?: number, query?: string, pageSize?: number): Observable<Food[]> {
    let params = {};

    if (pageNumber) {
      params = {
        ...params,
        pageNumber
      }
    }

    if (query) {
      params = {
        ...params,
        query
      }
    }

    if (pageSize) {
      params = {
        ...params,
        pageSize
      }
    }

    return this.http.get(`${FDC_BASE_URL}/foods/search`, {
      params: {
        api_key: FDC_API_KEY,
        ...params
      }
    }).pipe(
      map((element: any): Food[] => {
        return element.foods.map((food: any): Food => ({
          fdcId: food.fdcId,
          description: food.description,
          foodCategory: food.foodCategory,
          servingSize: food.servingSize || 0,
          servingSizeUnit: food.servingSizeUnit
        }))
      })
    )
  }
}
