export interface ResponseMeal {
    id: string;
    date: Date;
    ingredients: IngredienBase[];
}

export interface Meal {
    id: string;
    date: Date;
    ingredients: Ingredient[];
}

export interface IngredienBase {
    id: string;
    fdcId: number;
    amount: number;
}

export interface Ingredient extends IngredienBase {
    description: string;
    servingSize: number;
    nutrients: {
        calories: Nutrient;
        carbohydrates: Nutrient;
        proteins: Nutrient;
        sugars: Nutrient;
    }
}

export interface Nutrient {
    amount: number;
    unit: Unit;
}

export type Unit = 'g' | 'mg' | 'kcal';

export interface Food {
    fdcId: number;
    description: string;
    foodCategory: string;
    servingSize: number;
    servingSizeUnit: string;
}