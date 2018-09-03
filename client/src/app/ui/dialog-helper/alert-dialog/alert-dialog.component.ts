import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  @Input() message;

  constructor(private dialogRef: MatDialogRef<AlertDialogComponent>) { }

  ngOnInit() {
  }

  ok() {
    this.dialogRef.close();
  }

}
