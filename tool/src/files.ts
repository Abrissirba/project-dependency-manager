import * as fs from 'fs';
import * as glob from 'glob';
import * as licenseChecker from 'license-checker';
import { ModuleInfos } from 'license-checker';
import * as npmCheck from 'npm-check';
import * as ncu from 'npm-check-updates';
import * as path from 'path';
export class Files {
    static getPackageJson(dir): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(dir, '/package.json'), 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(JSON.parse(data));
            })
        })
    }

    static getVersions(dir) {
        const packageJsonPath = path.join(dir, 'package.json');

 
        npmCheck({
            update: false,
            cwd: dir
        })
        .then(currentState => console.log(currentState.get('packages')));

        return Promise.all([
            Files.getCurrentVersions(packageJsonPath),
            Files.getNewVersions(packageJsonPath),
            Files.getInstalledVersions(dir)
        ]).then(res => {
            console.log(dir, 'VERSIONS');
            return {
                current: res[0].prod,
                currentDev: res[0].dev,
                new: res[1],
                installed: res[2]
            }
        })
    }

    static getCurrentVersions(packageJsonPath: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(packageJsonPath, 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }
                const packageJson = JSON.parse(data);

                return resolve({
                    prod: packageJson.dependencies || {},
                    dev: packageJson.devDependencies || {}
                });
            })
        })
    }

    static getInstalledVersions(dir: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(dir, '/package-lock.json'), 'utf8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        return resolve(null);
                    }
                    return reject(err);
                }
                const packageLockJson = JSON.parse(data);
                const dependencies = Object.keys(packageLockJson.dependencies).reduce((result, key) => {
                    return {
                        ...result,
                        [key]: packageLockJson.dependencies[key].version
                    };
                }, {});

                return resolve(dependencies);
            })
        })
    }

    static getNewVersions(path: string) {
        return ncu.run({
            packageFile: path,
            silent: true,
            jsonUpgraded: true,
            upgrade: false,
            upgradeAll: true
        })
    }

    static getLicenses(path: string): Promise<ModuleInfos> {
        return new Promise((resolve, reject) => {
            licenseChecker.init({
                start: path
            }, function (err, json) {
                console.log(path, 'LICENSES');
                if (err) {
                    reject(err);
                } else {
                    resolve(json);
                }
            });
        })
    }

    static getAllPackageJsonDirectories(ignore: string[] = [], cwd = './'): Promise<string[]> {
        const ignorePatterns = ignore.reduce((res, ignorePath) => {
            return [
                ...res,
                `**/${ignorePath}/**`,
                `${ignorePath}/**`
            ]
        }, []);
        return new Promise((resolve, reject) => {
            glob('**/*package.json', {
                cwd,
                dot: true,
                ignore: ignorePatterns,
            }, (err, files) => {
                if (err) {
                    return reject(err);
                }
                return resolve(files.map(packageJsonPath => path.resolve(path.join(cwd, packageJsonPath))));
            })
        });
    }

    static writeProjectJsonFile(projects, path) {
        fs.writeFileSync(path, JSON.stringify(projects));
    }
}
