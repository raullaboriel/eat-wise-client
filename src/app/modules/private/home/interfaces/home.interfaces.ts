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

export interface AddMealDto {
    date?: Date;
    ingredients: Omit<IngredienBase, 'id'>[];
}

export interface EditMealDto {
    _id: string;
    date?: Date;
    ingredients: Omit<IngredienBase, 'id'>[];
}

export interface IngredienBase {
    id: string;
    fdcId: number;
    amount: number;
}

export interface Ingredient extends IngredienBase {
    description: string;
    foodCategory: string;
    servingSizeUnit: string;
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

export interface SelectedFoodWithId extends Food {
    id: string;
    servingSize?: number; // in grams
    quantity: number; // in units
}