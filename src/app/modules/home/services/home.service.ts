import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, FDC_API_KEY, FDC_BASE_URL } from 'src/app/config/constants/config.constants';
import { IngredienBase, Ingredient, Meal } from '../interfaces/home.interfaces';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getMeals(): Observable<Meal[]> {
    return this.http.get<any[]>(`${BASE_URL}/meals`, {
      withCredentials: true
    })
      .pipe(
        /*  map(meals =>
           meals.map(meal => ({
             id: meal._id,
             date: new Date(meal.date),
             ingredients: meal.ingredients.map((ingredient: any): IngredienBase => ({
               id: ingredient._id,
               fdcId: ingredient.fdcId,
               amount: ingredient.amount
             }))
           })) */
        mergeMap(meals =>
          forkJoin(
            meals.map(meal =>
              this.getMealWithIngredients(meal)
            )
          )
        )
      )
  }

  private getMealWithIngredients(meal: any): Observable<Meal> {
    return forkJoin<Ingredient[]>(
      meal.ingredients.map((ingredient: any) =>
        this.getMealIngredient({
          id: ingredient._id,
          fdcId: ingredient.fdcId,
          amount: ingredient.amount
        })
      )
    ).pipe(
      map((ingredients): Meal => ({
        id: meal._id,
        date: new Date(meal.date),
        ingredients
      }))
    );
  }

  getMealIngredient(ingredient: IngredienBase): Observable<Ingredient> {
    return this.http.get(`${FDC_BASE_URL}/food/${ingredient.fdcId}`, {
      params: {
        api_key: FDC_API_KEY
      }
    })
      .pipe(
        map((element: any): Ingredient => {
          const ingredientNutrientsMap = new Map<string, { amount: number; unit: string }>();

          element.foodNutrients.forEach((element: any) => {
            ingredientNutrientsMap.set(element.nutrient.number, {
              amount: element.amount,
              unit: element.nutrient.unitName
            });
          })

          return {
            ...ingredient,
            description: element.description,
            servingSize: element.servingSize || 0,
            nutrients: {
              calories: {
                amount: ingredientNutrientsMap.get('208')?.amount || 0,
                unit: 'kcal'
              },
              carbohydrates: {
                amount: ingredientNutrientsMap.get('205')?.amount || 0,
                unit: 'g'
              },
              proteins: {
                amount: ingredientNutrientsMap.get('203')?.amount || 0,
                unit: 'g'
              },
              sugars: {
                amount: ingredientNutrientsMap.get('269')?.amount || 0,
                unit: 'g'
              }
            }
          }
        })
      )
  }
}
