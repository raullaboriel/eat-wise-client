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

export interface MealDto {
    date: Date;
    ingredients: IngredienBase[];
}

export interface IngredienBase {
    id: string;
    fdcId: number;
    amount: number;
}

export interface Ingredient extends IngredienBase {
    description: string;
    servingSize?: number;
    nutrients: Nutrient[];
}

export interface Nutrient {
    id: string;
    name: string;
    amount: number;
    unit: Unit;
    icon: string;
}

export type Unit = 'g' | 'mg' | 'kcal';

export interface Food {
    fdcId: number;
    description: string;
    foodCategory: string;
    servingSize?: number;
    servingSizeUnit: string;
    nutrients: Nutrient[];
}

export interface SelectedFood extends Food {
    servingSize?: number; // in grams
    quantity: number; // in units
}