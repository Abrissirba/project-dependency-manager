import * as path from 'path';
import { promiseSerial } from '../shared';
import { ModuleInfos } from './node_modules/@types/license-checker';
import { Files } from './src/files';
import { HttpClient, HttpClientConfig } from './src/http-client';
import { DependencyTypeEnum, ISyncProjectDTO } from './src/models';
import { Options } from './src/options';
const IGNORE = ['node_modules', 'bower_components', 'plugins/cordova-plugin*', 'vendor'];
const CWD = '../../sx-ngx-fabric';

const JSON_OUTPUT = './tmp/projects.json';
const HTTP_CONFIG: HttpClientConfig = {
    serverUrl: 'http://localhost:4001'
}

const httpClient = new HttpClient(HTTP_CONFIG);

function getProjectFiles(dir) {
    return Promise.all([
        Files.getVersions(dir),
        Files.getLicenses(dir),
        Files.getPackageJson(dir)
    ]).then(res => {
        return {
            dir,
            ...res[0],
            licenses: res[1],
            packageJson: res[2]
        }
    })
}

function getLicenseForDependencyTitle(title: string, licenses: ModuleInfos) {
    const keys = Object.keys(licenses);
    
    for (let i = 0; i < keys.length; i++) {
        const split = keys[i].split('@');
        const packageName = split.length > 2 ? '@' + split[1] : split[0];
        if (packageName === title) {
            return licenses[keys[i]];
        }
    };
}

function updateProject(projectFile, projectFileCurrentDependencyObj, projectFileNewDependencyObj, project, projectCurrentDependency, projectNewDependency) {
    Object.keys(projectFileCurrentDependencyObj).map(depKey => {
        projectCurrentDependency[depKey] = projectFileCurrentDependencyObj[depKey];
        projectNewDependency[depKey] = projectFileNewDependencyObj[depKey] || projectCurrentDependency[depKey];
        const installedVersion = projectFile.installed ? projectFile.installed[depKey] : null;
        project.installedDependencies[depKey] = installedVersion;
        project.dependencies[depKey] = getLicenseForDependencyTitle(depKey, projectFile.licenses);
    });
}

function getProjectDependencies(projectFile, type: DependencyTypeEnum) {
    const projectFileType = type === DependencyTypeEnum.Prod ? '' : 'Dev';

    return Object.keys(projectFile['current' + projectFileType]).map(depKey => {
        const moduleInfo = getLicenseForDependencyTitle(depKey, projectFile.licenses);

        return {
            key: depKey,
            currentVersion: projectFile['current' + projectFileType][depKey],
            newVersion: projectFile.new[depKey],
            installedVersion: projectFile.installed ? projectFile.installed[depKey] : null,
            repo: moduleInfo ? moduleInfo.repository : null,
            title: moduleInfo ? moduleInfo.name : null,
            license: moduleInfo ? (!moduleInfo.licenses || typeof moduleInfo.licenses === 'string') ? moduleInfo.licenses.toString() : (moduleInfo.licenses as string[]).join(', ') : null,
            type
        };
    });
}

async function run(options: Options = {}) {
    console.log('RUN')
    const packageJsonLocations = await Files.getAllPackageJsonDirectories(options.ignore, options.cwd);
    console.log(packageJsonLocations)
    const projectFiles = await promiseSerial(packageJsonLocations
        .map(path.dirname)
        .map(x => () => getProjectFiles(x)))

    const projects: ISyncProjectDTO[] = projectFiles.map(projectFile => {
        const project = {
            title: projectFile.packageJson.name,
            path: projectFile.dir,
            hasPackageLockFile: !!projectFile.installed,
            dependencies: [
                ...getProjectDependencies(projectFile, DependencyTypeEnum.Prod),
                ...getProjectDependencies(projectFile, DependencyTypeEnum.Dev)
            ]
        };

        return project;
    });

    if (JSON_OUTPUT) {
        Files.writeProjectJsonFile(projects, JSON_OUTPUT);
    }
    console.log(projects)
    // httpClient.send(projects);
}

run({
    ignore: IGNORE,
    cwd: CWD
});