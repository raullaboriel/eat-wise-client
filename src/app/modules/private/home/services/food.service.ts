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
        dataType: 'Branded,Foundation,Survey (FNDDS)',
        ...params
      }
    }).pipe(
      map((element: any): Food[] => {



        return element.foods.map((food: any): Food => {
          const ingredientNutrientsMap = new Map<string, { amount: number; unit: string }>();

          food?.foodNutrients?.forEach((element: any) => {
            ingredientNutrientsMap.set(element.nutrientNumber, {
              amount: element.value,
              unit: element.unitName
            });
          });

          return {
            fdcId: food.fdcId,
            description: food.description,
            foodCategory: food.foodCategory,
            servingSize: food.servingSize,
            servingSizeUnit: food.servingSizeUnit,
            nutrients: [
              {
                id: '208',
                name: 'Calorias',
                amount: ingredientNutrientsMap.get('208')?.amount || 0,
                unit: 'kcal',
                icon: 'fire',
              },
              {
                id: '205',
                name: 'Carbohidratos',
                amount: ingredientNutrientsMap.get('205')?.amount || 0,
                unit: 'g',
                icon: 'bowl-rice'
              },
              {
                id: '203',
                name: 'Proteinas',
                amount: ingredientNutrientsMap.get('203')?.amount || 0,
                unit: 'g',
                icon: 'dna'
              },
              {
                id: '269',
                name: 'Azucares',
                amount: ingredientNutrientsMap.get('269')?.amount || 0,
                unit: 'g',
                icon: 'cubes-stacked'
              }
            ]
          }
        })
      })
    )
  }
}
