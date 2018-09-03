import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProject } from 'src/project-references';
import { OnDestroyComponent } from '../../../ui';
import { FetchProjects, ProjectsState } from '../../store';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent extends OnDestroyComponent implements OnInit {

  @Select(ProjectsState.projects) projects$: Observable<IProject[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    super();
    this.store.dispatch(new FetchProjects());
  }

  ngOnInit() {
  }

  onProjectClick(project: IProject) {
    this.router.navigate(['projects', project.id])
  }

}
