import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from '../core/core.module';
import { ServerApiModule } from '../server-api/server-api.module';
import { MaterialModule } from '../ui';
import { UiModule } from '../ui/ui.module';
import { EditProjectFormComponent } from './components/edit-project-form/edit-project-form.component';
import { ProjectLocationTableComponent } from './components/project-location-table/project-location-table.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { DependencyPageComponent } from './containers/dependency-page/dependency-page.component';
import { EditProjectDialogComponent } from './containers/edit-project-dialog/edit-project-dialog.component';
import { ProjectDependencyPageComponent } from './containers/project-dependency-page/project-dependency-page.component';
import { ProjectDetailsPageComponent } from './containers/project-details-page/project-details-page.component';
import { ProjectLocationPageComponent } from './containers/project-location-page/project-location-page.component';
import { ProjectPageComponent } from './containers/project-page/project-page.component';
import { ProjectState } from './store';
import { ProjectDependencyTableComponent } from './components/project-dependency-table/project-dependency-table.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectDependenciesJsonPanelComponent } from './components/project-dependencies-json-panel/project-dependencies-json-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UiModule,
    CoreModule,
    NgxsModule.forFeature(ProjectState),
    RouterModule.forChild([
      { path: 'projects', component: ProjectPageComponent },
      { path: 'projects/:id', component: ProjectDetailsPageComponent },
      { path: 'project-locations', component: ProjectLocationPageComponent },
      { path: 'project-dependencies', component: ProjectDependencyPageComponent },
      { path: 'dependencies', component: DependencyPageComponent },
    ]),
    ServerApiModule
  ],
  declarations: [
    ProjectPageComponent,
    ProjectTableComponent,
    ProjectLocationTableComponent,
    EditProjectDialogComponent,
    EditProjectFormComponent,
    ProjectLocationPageComponent,
    DependencyPageComponent,
    ProjectDependencyPageComponent,
    ProjectDetailsPageComponent,
    ProjectDependencyTableComponent,
    ProjectDetailsComponent,
    ProjectDependenciesJsonPanelComponent
  ],
  entryComponents: [
    EditProjectDialogComponent
  ]
})
export class ProjectModule { }
