import { IProject } from './i-project.model';

export interface IProjectLocation {
    id: number;
    title?: string;
    path: string;
    projectId?: number;
    ignoreDate?: string | Date;

    createdDate: string | Date;
    project?: IProject;
}