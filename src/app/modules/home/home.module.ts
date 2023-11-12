import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from './components/meal-card/meal-card.component';

import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnobModule } from 'primeng/knob';

import { FormsModule } from '@angular/forms';
import { HomeService } from './services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { MealCardIngredientComponent } from './components/meal-card-ingredient/meal-card-ingredient.component';

@NgModule({
  declarations: [
    MealCardComponent,
    MealCardIngredientComponent,
  ],
  providers: [
    HomeService
  ],
  imports: [
    CommonModule,
    CardModule,
    ChipModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    KnobModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    MealCardComponent
  ]
})
export class HomeModule { }
