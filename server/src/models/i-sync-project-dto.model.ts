export interface ISyncProjectDTO {
    title: string;
    path: string;
    hasPackageLockFile: boolean;
    dependencies: ISyncProjectDependencyDTO[];
}

export interface ISyncProjectDependencyDTO {
    title: string;
    bump: string;
    currentVersion: string;
    latestVersion: string;
    installedVersion: string;
    wantedVersion: string;
    license: string;
    repo: string;
    isDevDependency: boolean;
}

export enum DependencyTypeEnum {
    Prod = 1,
    Dev = 2,
}