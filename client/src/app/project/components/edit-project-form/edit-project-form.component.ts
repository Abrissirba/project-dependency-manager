import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrls: ['./edit-project-form.component.scss']
})
export class EditProjectFormComponent {

  @Input() projectFormGroup: FormGroup;

  get isValid() { return this.projectFormGroup.valid; }

  constructor() { 
  }

}
