import { ProjectDependenciesState } from './project-dependencies.state';
import { ProjectLocationsState } from './project-locations.state';
import { ProjectsState } from './projects.state';

export const ProjectState = [ProjectLocationsState, ProjectsState, ProjectDependenciesState];

export * from './project-dependencies.state';
export * from './project-locations.state';
export * from './projects.state';

