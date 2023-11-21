import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
@NgModule({
  declarations: [
    ButtonComponent,
    FormInputComponent,
    SearchComponent,
    TableComponent,
    ModalConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonComponent,
    FormInputComponent,
    SearchComponent,
    TableComponent,
    ModalConfirmationComponent
  ]
})
export class SharedControlsModule { }
