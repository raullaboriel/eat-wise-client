import { Ingredient, Nutrient } from "../home/interfaces/home.interfaces";

export const getNutrientsProportion = (ingredient: Ingredient, nutrient: Nutrient) => {
    const amount = (nutrient.amount / (ingredient.servingSize || 1)) * ingredient.amount;

    return amount;
}