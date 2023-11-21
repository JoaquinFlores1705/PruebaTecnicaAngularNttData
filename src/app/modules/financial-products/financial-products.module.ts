import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinancialProductsRoutingModule } from './financial-products-routing.module';
import { FormRegisterProductComponent } from './components/form-register-product/form-register-product.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedControlsModule } from '../shared-controls/shared-controls.module';

@NgModule({
  declarations: [
    FormRegisterProductComponent,
    RegisterPageComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedControlsModule,
    FinancialProductsRoutingModule,
  ],
  exports: [
    FormRegisterProductComponent,
    RegisterPageComponent,
    MainPageComponent
  ]
})
export class FinancialProductsModule { }
