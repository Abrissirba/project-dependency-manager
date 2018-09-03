export interface ISyncProjectDTO {
    title: string;
    path: string;
    hasPackageLockFile: boolean;
    dependencies: ISyncProjectDependencyDTO[];
}

export interface ISyncProjectDependencyDTO {
    key: string;
    title: string;
    currentVersion: string;
    newVersion: string;
    installedVersion: string;
    license: string;
    repo: string;
    type: DependencyTypeEnum;
}

export enum DependencyTypeEnum {
    Prod = 1,
    Dev = 2,
}