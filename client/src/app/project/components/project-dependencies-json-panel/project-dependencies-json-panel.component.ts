import { Component, Input, OnInit } from '@angular/core';
import { DependencyTypeEnum } from '../../../../../../server/src/models/i-sync-project-dto.model';
import { IProject, IProjectDependency } from '../../../../project-references';

@Component({
  selector: 'app-project-dependencies-json-panel',
  templateUrl: './project-dependencies-json-panel.component.html',
  styleUrls: ['./project-dependencies-json-panel.component.scss']
})
export class ProjectDependenciesJsonPanelComponent implements OnInit {

  private _project: IProject;
  @Input() get project() { return this._project; }
  set project(val) {
    this._project = val;
    if (val) {
      this.json = this.getPackageJsonFormat(val.dependencies);
    }
  }

  json = null;

  constructor() { }

  ngOnInit() {
  }

  getPackageJsonFormat(projectDependencies: IProjectDependency[]) {
    const prod = projectDependencies.filter(x => x.type === DependencyTypeEnum.Prod).reduce((result, projectDependency) => {
      return {
        ...result,
        [projectDependency.dependency.key]: projectDependency.newVersion || projectDependency.currentVersion
      }
    }, {});

    const dev = projectDependencies.filter(x => x.type === DependencyTypeEnum.Dev).reduce((result, projectDependency) => {
      return {
        ...result,
        [projectDependency.dependency.key]: projectDependency.newVersion || projectDependency.currentVersion
      }
    }, {});

    return {
      dependencies: prod,
      devDependencies: dev

    }
  }

}
