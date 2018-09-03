import { IProject } from '../db/interfaces';

export interface IAddProjectDTO {
    project: IProject;
    projectLocationId: number;
}