import { IProjectDependency } from './i-project-dependency.model';
import { IProjectLocation } from './i-project-location.model';

export interface IProject {
    id: number;
    title?: string;
    description?: string;
    hasPackageLockFile: boolean;
    createdDate: string | Date;
    modifiedDate: string | Date;

    dependencies: IProjectDependency[];
    projectLocation: IProjectLocation;
}