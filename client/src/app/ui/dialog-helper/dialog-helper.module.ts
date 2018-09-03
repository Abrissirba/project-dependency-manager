import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material/material.module';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogHelperService } from './dialog-helper.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  declarations: [
    AlertDialogComponent, 
    ConfirmDialogComponent
  ],
  entryComponents: [
    AlertDialogComponent, 
    ConfirmDialogComponent
  ],
  exports: [
    AlertDialogComponent, 
    ConfirmDialogComponent
  ]
})
export class DialogHelperModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogHelperModule,
      providers: [
        DialogHelperService
      ]
    };
  }
}
