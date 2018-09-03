import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProjectDependenciesApiService } from './rest/project-dependencies-api.service';
import { ProjectLocationsApiService } from './rest/project-locations-api.service';
import { ProjectsApiService } from './rest/projects.service';

const providers = [
  ProjectLocationsApiService,
  ProjectsApiService,
  ProjectDependenciesApiService
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers
})
export class ServerApiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServerApiModule,
      providers
    };
  }
}
