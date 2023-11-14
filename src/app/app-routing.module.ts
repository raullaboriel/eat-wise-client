import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './modules/private/private.component';
import { HomeComponent } from './modules/private/home/home.component';

const routes: Routes = [{
  path: '',
  component: PrivateComponent,
  children: [
    {
      path: '',
      component: HomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
