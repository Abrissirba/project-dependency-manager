import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent, ConfirmDialogOptions } from './confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogHelperService {

  private _defaultDialogOptions: MatDialogConfig = {
    disableClose: true
  }

  private _defaultDialogSizeOptions = {
    [DialogSize.Auto]: {},
    [DialogSize.Small]: {},
    [DialogSize.Medium]: {},
    [DialogSize.Large]: {
      width: 'calc(100vw - 32px)', 
      height: 'calc(100vh - 32px)',
      maxWidth: 'calc(100vw - 32px)',
      position: { top: '16px' }
    },
    [DialogSize.FullScreen]: {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh', 
      position: { top: '0' }
    }
  }

  constructor(
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  alert(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, this._defaultDialogOptions);
    dialogRef.componentInstance.message = message;
    return dialogRef;
  }

  confirm(options: ConfirmDialogOptions | string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, this._defaultDialogOptions);

    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    
    dialogRef.componentInstance.options = options;
    return dialogRef;
  }

  open<T>(component: ComponentType<T>, options?: DialogOptions): MatDialogRef<T> {
    options = options || {};
    options.size = options.size || DialogSize.Auto;
    options.panelClass = options.size;

    const dialogOptions = {
      ...this._defaultDialogOptions,
      ...this._defaultDialogSizeOptions[options.size],
      ...options
    };

    return this.dialog.open<T>(component, dialogOptions);
  }

  successToast(message: string) {
      this.toastrService.success(message)
  }

  saveSuccessToast() {
    this.successToast('Saved successfully');
  }

}

export interface DialogOptions extends MatDialogConfig {
  size?: DialogSize
}

export enum DialogSize {
  Auto = 'auto',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  FullScreen = 'fullscreen'
}