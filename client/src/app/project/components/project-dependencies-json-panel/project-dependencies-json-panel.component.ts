import { Component, Input, OnInit } from '@angular/core';
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
      this.latest = this.getPackageJsonFormat(val.dependencies, 'latest');
      this.wanted = this.getPackageJsonFormat(val.dependencies, 'wanted');
    }
  }

  latest = null;
  wanted = null;

  constructor() { }

  ngOnInit() {
  }

  getPackageJsonFormat(projectDependencies: IProjectDependency[], type: 'latest' | 'wanted') {
    const newVersionKey = type + 'Version';

    const prod = projectDependencies.filter(x => !x.isDevDependency).reduce((result, projectDependency) => {
      return {
        ...result,
        [projectDependency.dependency.title]: projectDependency[newVersionKey] || projectDependency.currentVersion
      }
    }, {});

    const dev = projectDependencies.filter(x => x.isDevDependency).reduce((result, projectDependency) => {
      return {
        ...result,
        [projectDependency.dependency.title]: projectDependency[newVersionKey] || projectDependency.currentVersion
      }
    }, {});

    return {
      dependencies: prod,
      devDependencies: dev
    }
  }

}
