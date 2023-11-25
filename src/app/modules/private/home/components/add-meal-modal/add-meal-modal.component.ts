import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'add-meal-modal',
  templateUrl: './add-meal-modal.component.html',
  styleUrls: ['./add-meal-modal.component.scss']
})
export class AddMealModalComponent {
  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter();

  onClose() {
    this.visibleChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.visibleChange.unsubscribe();
  }
}
