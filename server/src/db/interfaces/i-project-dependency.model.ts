import { IDependency } from './i-dependency.model';
import { IProject } from './i-project.model';

export interface IProjectDependency {
    projectId: number;
    dependencyId: number;
    currentVersion?: string;
    latestVersion?: string;
    installedVersion?: string;
    wantedVersion?: string;
    isDevDependency: boolean;
    bump?: string;

    createdDate: string | Date;
    modifiedDate: string | Date;

    dependency?: IDependency;
    project?: IProject;
}