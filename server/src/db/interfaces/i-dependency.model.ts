import { IProjectDependency } from './i-project-dependency.model';
export interface IDependency {
    id: number;
    title: string;
    repo?: string;
    license?: string;

    createdDate: string | Date;
    modifiedDate: string | Date;

    projectDependencies: IProjectDependency[];
}
