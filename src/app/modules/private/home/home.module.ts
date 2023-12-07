import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from './components/meal-card/meal-card.component';

import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { KnobModule } from 'primeng/knob';
import { DialogModule } from 'primeng/dialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SliderModule } from 'primeng/slider';

import { FormsModule } from '@angular/forms';
import { HomeService } from './services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { MealCardIngredientComponent } from './components/meal-card-ingredient/meal-card-ingredient.component';
import { MealCardSkeletonComponent } from './components/meal-card-skeleton/meal-card-skeleton.component';
import { MealCardIngredientSkeletonComponent } from './components/meal-card-ingredient-skeleton/meal-card-ingredient-skeleton.component';
import { AddMealModalComponent } from './components/add-meal-modal/add-meal-modal.component';
import { MessageService } from 'primeng/api';

import { HomeComponent } from './home.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RouterModule } from '@angular/router';
import { FoodSearchComponent } from './components/food-search/food-search.component';
import { FoodService } from './services/food.service';

import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { EditMealModalComponent } from './components/edit-meal-modal/edit-meal-modal.component';

@NgModule({
  declarations: [
    MealCardComponent,
    MealCardIngredientComponent,
    MealCardSkeletonComponent,
    MealCardIngredientSkeletonComponent,
    AddMealModalComponent,
    HomeComponent,
    FoodSearchComponent,
    EditMealModalComponent
  ],
  providers: [
    HomeService,
    FoodService,
    MessageService
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChipModule,
    OverlayPanelModule,
    KnobModule,
    FormsModule,
    HttpClientModule,
    SkeletonModule,
    DialogModule,
    RouterModule,
    VirtualScrollerModule,
    InfiniteScrollModule,
    InputTextModule,
    DropdownModule,
    ProgressSpinnerModule,
    SliderModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeWidth: 10,
      innerStrokeWidth: 10,
      animateTitle: false,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
    })
  ]
})
export class HomeModule { }
