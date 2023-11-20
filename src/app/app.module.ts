import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/controls/button/button.component';
import { SearchComponent } from './shared/components/controls/search/search.component';
import { FormInputComponent } from './shared/components/controls/form-input/form-input.component';
import { TableComponent } from './shared/components/controls/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SearchComponent,
    FormInputComponent,
    TableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
