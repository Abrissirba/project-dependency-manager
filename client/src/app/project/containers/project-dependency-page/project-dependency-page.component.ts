import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IProjectDependency } from 'src/project-references';
import { FetchProjectDependencies, ProjectDependenciesState } from './../../store/project-dependencies.state';

@Component({
  selector: 'app-project-dependency-page',
  templateUrl: './project-dependency-page.component.html',
  styleUrls: ['./project-dependency-page.component.scss']
})
export class ProjectDependencyPageComponent {

  @Select(ProjectDependenciesState.projectDependencies) projectDependencies$: Observable<IProjectDependency[]>;

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new FetchProjectDependencies());
  }

}
