import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public.component';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoginComponent,
    PublicComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
