import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, FDC_API_KEY, FDC_BASE_URL } from 'src/app/config/constants/config.constants';
import { IngredienBase, Ingredient, Meal, AddMealDto, ResponseMeal, EditMealDto } from '../interfaces/home.interfaces';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';

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
        mergeMap(meals => {
          if (meals.length === 0) {
            // If meals array is empty, emit an empty array directly
            return of([]);
          } else {
            // Otherwise, proceed with forkJoin
            return forkJoin(
              meals.map(meal => this.getMealWithIngredients(meal))
            );
          }
        })
      );
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

  editMeal(meal: EditMealDto): Observable<ResponseMeal> {
    return this.http.put(`${BASE_URL}/meals`, meal, {
      withCredentials: true
    }).pipe(
      map((meal: any) => {
        return {
          id: meal._id,
          date: new Date(meal.date),
          ingredients: meal.ingredients.map((ingredient: any): IngredienBase => ({
            id: ingredient._id,
            fdcId: ingredient.fdcId,
            amount: ingredient.amount
          }))
        }
      })
    )
  }

  addMeal(meal: AddMealDto): Observable<ResponseMeal> {
    return this.http.post(`${BASE_URL}/meals`, meal, {
      withCredentials: true
    }).pipe(
      map((meal: any) => {
        return {
          id: meal._id,
          date: new Date(meal.date),
          ingredients: meal.ingredients.map((ingredient: any): IngredienBase => ({
            id: ingredient._id,
            fdcId: ingredient.fdcId,
            amount: ingredient.amount
          }))
        }
      })
    )
  }

  deleteMeal(id: string): Observable<string> {
    return this.http.delete(`${BASE_URL}/meals/${id}`, {
      withCredentials: true
    }).pipe(
      map((meal: any) => {
        return meal._id
      })
    )
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
            servingSize: element.servingSize,
            foodCategory: element.foodCategory,
            servingSizeUnit: element.servingSizeUnit,
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
      )
  }
}
