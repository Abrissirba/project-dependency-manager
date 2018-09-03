import * as path from 'path';
import { promiseSerial } from '../shared';
import { ModuleInfos } from './node_modules/@types/license-checker';
import { Files, INpmCheckPackageModel } from './src/files';
import { HttpClient, HttpClientConfig } from './src/http-client';
import { ISyncProjectDependencyDTO, ISyncProjectDTO } from './src/models';
import { Options } from './src/options';
const IGNORE = ['node_modules', 'bower_components', 'plugins/cordova-plugin*', 'vendor'];
const CWD = '../../';

const JSON_OUTPUT = './tmp/projects.json';
const HTTP_CONFIG: HttpClientConfig = {
    serverUrl: 'http://localhost:4001'
}

const httpClient = new HttpClient(HTTP_CONFIG);

interface IProjectFiles {
    dir: string;
    packages: INpmCheckPackageModel[],
    licenses: ModuleInfos,
    packageJson: any;
    installedPackages: any;
}

function getProjectFiles(dir): Promise<IProjectFiles> {
    return Promise.all([
        Files.getVersions(dir),
        Files.getLicenses(dir),
        Files.getPackageJson(dir),
        Files.getInstalledVersions(dir)
    ]).then(res => {
        return {
            dir,
            // ...res[0],
            packages: res[0],
            licenses: res[1],
            packageJson: res[2],
            installedPackages: res[3]
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

function getPackageJsonDependencyKey(isDevDependency: boolean) {
    return isDevDependency ? 'devDependencies' : 'dependencies';
}

function getPacakgeRangeSymbol(version) {
    const firstChar = version ? version[0] : null;
    if (firstChar && !Number(firstChar)) {
        return firstChar;
    }
    return '';
}

function getProjectDependencies(projectFile: IProjectFiles, isDevDependency: boolean): ISyncProjectDependencyDTO[] {
    const packageType = getPackageJsonDependencyKey(isDevDependency);

    if (!projectFile.packageJson[packageType]) {
        return [];
    }

    return Object.keys(projectFile.packageJson[packageType]).map(depKey => {
        const moduleInfo = getLicenseForDependencyTitle(depKey, projectFile.licenses);
        const packageInfo: INpmCheckPackageModel = projectFile.packages.find(x => x.moduleName === depKey) || {} as any;
        const rangeSymbol = getPacakgeRangeSymbol(packageInfo.packageJson);
        return {
            title: depKey,
            currentVersion: packageInfo.packageJson,
            latestVersion: packageInfo.latest ? rangeSymbol + packageInfo.latest : null,
            installedVersion: projectFile.installedPackages ? projectFile.installedPackages[depKey] : null,
            bump: packageInfo.bump,
            wantedVersion: packageInfo.packageWanted ? rangeSymbol + packageInfo.packageWanted : null,
            repo: packageInfo.homepage,
            license: moduleInfo ? (!moduleInfo.licenses || typeof moduleInfo.licenses === 'string') ? moduleInfo.licenses.toString() : (moduleInfo.licenses as string[]).join(', ') : null,
            isDevDependency
        } as ISyncProjectDependencyDTO;
    });
}

async function run(options: Options = {}) {
    console.log('RUN')
    const packageJsonLocations = await Files.getAllPackageJsonDirectories(options.ignore, options.cwd);
    console.log(packageJsonLocations)
    const projectFiles: IProjectFiles[] = await promiseSerial(packageJsonLocations
        .map(path.dirname)
        .map(x => () => getProjectFiles(x)))

    const projects: ISyncProjectDTO[] = projectFiles.map(projectFile => {
        const project = {
            title: projectFile.packageJson.name,
            path: projectFile.dir,
            hasPackageLockFile: !!projectFile.installedPackages,
            dependencies: [
                ...getProjectDependencies(projectFile, false),
                ...getProjectDependencies(projectFile, true)
            ]
        };

        return project;
    });

    if (JSON_OUTPUT) {
        Files.writeProjectJsonFile(projects, JSON_OUTPUT);
    }
    console.log(projects)
    httpClient.send(projects);
}

run({
    ignore: IGNORE,
    cwd: CWD
});