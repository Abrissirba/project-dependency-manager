import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  private _defaultOptions: ConfirmDialogOptions = {
    ok: 'Ok',
    cancel: 'Cancel',
    title: 'Are you sure?',
    message: ''
  }

  private _options: ConfirmDialogOptions;
  @Input() get options() { return this._options || this._defaultOptions; }
  set options(value: ConfirmDialogOptions) {
    this._options = {
      ...this._defaultOptions, ...value
    }
  }

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {

  }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogOptions {
  message: string;
  ok?: string;
  cancel?: string;
  title?: string;
}