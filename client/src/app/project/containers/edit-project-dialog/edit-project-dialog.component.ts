import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IProject } from 'src/project-references';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.scss']
})
export class EditProjectDialogComponent {

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public project: IProject
  ) {
    this.initForm();
    if (this.project) {
      this.updateForm(this.project);
    }
  }

  onSave() {
    this.dialogRef.close({
      ...this.project,
      ...this.formGroup.value
    });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null]
    });
  }

  updateForm(val: IProject) {
    this.formGroup.patchValue({
      title: val.title,
      description: val.description
    }, { emitEvent: false })
  }
}
