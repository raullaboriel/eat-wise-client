import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { HomeModule } from './home/home.module';
import { RouterOutlet } from '@angular/router';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterOutlet,
    PrivateRoutingModule,
  ]
})
export class PrivateModule { }
