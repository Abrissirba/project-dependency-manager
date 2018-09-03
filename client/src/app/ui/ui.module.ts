import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableSearchHeaderComponent } from './components/table-search-header/table-search-header.component';
import { DialogHelperModule } from './dialog-helper/dialog-helper.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogHelperModule.forRoot()
  ],
  declarations: [TableSearchHeaderComponent],
  exports: [
    TableSearchHeaderComponent,
    DialogHelperModule
  ]
})
export class UiModule { }
