import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HomeComponent } from './pages/home/home.component';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KnobModule } from 'primeng/knob';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ChipModule,
    OverlayPanelModule,
    BrowserAnimationsModule,
    KnobModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
