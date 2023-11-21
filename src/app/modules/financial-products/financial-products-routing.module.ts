import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [{
  path: '', component: MainPageComponent
},{
  path: 'registro/agregar', component: RegisterPageComponent
},{
  path: 'registro/edicion/:id', component: RegisterPageComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialProductsRoutingModule { }
