import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProject } from '../../../../project-references';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() project: IProject;

  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditClick() {
    this.edit.next(this.project);
  }

}
