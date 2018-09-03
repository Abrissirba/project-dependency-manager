import { DependencyTypeEnum } from './../../models/i-sync-project-dto.model';
import { IDependency } from './i-dependency.model';
import { IProject } from './i-project.model';

export interface IProjectDependency {
    projectId: number;
    dependencyId: number;
    currentVersion?: string;
    newVersion?: string;
    installedVersion?: string;
    type?: DependencyTypeEnum;

    createdDate: string | Date;
    modifiedDate: string | Date;

    dependency?: IDependency;
    project?: IProject;
}