import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from './components/meal-card/meal-card.component';

import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnobModule } from 'primeng/knob';
import { DialogModule } from 'primeng/dialog';

import { FormsModule } from '@angular/forms';
import { HomeService } from './services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { MealCardIngredientComponent } from './components/meal-card-ingredient/meal-card-ingredient.component';
import { MealCardSkeletonComponent } from './components/meal-card-skeleton/meal-card-skeleton.component';
import { MealCardIngredientSkeletonComponent } from './components/meal-card-ingredient-skeleton/meal-card-ingredient-skeleton.component';
import { AddMealModalComponent } from './components/add-meal-modal/add-meal-modal.component';

@NgModule({
  declarations: [
    MealCardComponent,
    MealCardIngredientComponent,
    MealCardSkeletonComponent,
    MealCardIngredientSkeletonComponent,
    AddMealModalComponent,
  ],
  providers: [
    HomeService,
  ],
  imports: [
    CommonModule,
    CardModule,
    ChipModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    KnobModule,
    FormsModule,
    HttpClientModule,
    SkeletonModule,
    DialogModule
  ],
  exports: [
    MealCardComponent,
    MealCardSkeletonComponent,
    AddMealModalComponent
  ]
})
export class HomeModule { }
