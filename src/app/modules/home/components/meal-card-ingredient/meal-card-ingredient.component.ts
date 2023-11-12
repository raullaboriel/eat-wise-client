import { Component, Input } from '@angular/core';
import { IngredienBase, Ingredient } from '../../interfaces/home.interfaces';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'meal-card-ingredient',
  templateUrl: './meal-card-ingredient.component.html',
  styleUrls: ['./meal-card-ingredient.component.scss']
})
export class MealCardIngredientComponent {
  @Input() ingredient!: IngredienBase;
  detailedIngredient?: Ingredient;

  constructor(private homeService: HomeService) {

  }

  ngOnInit(): void {
    this.homeService.getMealIngredient(this.ingredient).subscribe((data) => {
      const deletailedIngredient: Ingredient = {
        ...this.ingredient,
        description: data.description,
        nutrients: data.nutrients,
        servingSize: data.servingSize
      }
      this.detailedIngredient = deletailedIngredient;
    });
  }
}
