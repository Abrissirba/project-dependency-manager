import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Project, ProjectDependency } from '../db/entity';
import { IProject } from '../db/interfaces';
import { IAddProjectDTO, ISyncProjectDTO } from '../models';
import { DependencyService } from '../services/dependency.service';
import { ProjectService } from '../services/project.service';
import { Dependency } from './../db/entity/dependency.entity';
import { ProjectLocationService } from './../services/project-location.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectService: ProjectService,
        private readonly projectLocationService: ProjectLocationService,
        private readonly dependencyService: DependencyService,
    ) { }

    @Get()
    async getAll() {
        return await this.projectService.getAll();
    }

    @Get(':id')
    async get(@Param() params) {
        const id = parseInt(params.id, 10);
        const project = await this.projectService.get(id);
        if (!project) {
            throw new NotFoundException('No package with the provided id was found');
        }
        return project;
    }

    @Post()
    async save(@Body() project: IProject) {
        return await this.projectService.save(new Project(project));
    }

    @Post('add')
    async add(@Body() data: IAddProjectDTO) {
        const project = await this.projectService.save(new Project(data.project));
        await this.projectLocationService.update(data.projectLocationId, { projectId: project.id });
        return project;
    }

    @Post('sync')
    async sync(@Body() projects: ISyncProjectDTO[]) {
        const paths = projects.map(x => x.path);
        const dbProjects = await this.projectService.getByLocationPath(paths);
        const updatedProjets = await this.promiseSerial(dbProjects.map(dbProject => () => this.updateProject(projects, dbProject)));

        return updatedProjets;
    }

    updateProject(updatedProjects: ISyncProjectDTO[], dbProject: Project) {
        return new Promise(async (resolve, reject) => {
            const updatedProject = updatedProjects.find(x => x.path.toLowerCase() === dbProject.projectLocation.path.toLowerCase());

            let dbDependencies = await this.dependencyService.getAll();

            dbDependencies = [...dbDependencies, ...(await this.saveNewDependencies(updatedProject, dbDependencies))];

            dbProject.dependencies = this.getDependencies(updatedProject, dbProject, dbDependencies);

            dbProject.hasPackageLockFile = updatedProject.hasPackageLockFile;

            await this.projectService.save(dbProject);
            resolve(dbProject);
        });
    }

    getDependencies(updatedProject: ISyncProjectDTO, dbProject: Project, dependencies: Dependency[]) {
        return updatedProject.dependencies.map(updatedProjectDependency => {
            const dependency = dependencies.find(x => x.key === updatedProjectDependency.key);
            const dbProjectDependency = dbProject.dependencies.find(x => x.dependencyId === dependency.id);
            const updatedDependency: ProjectDependency = {
                projectId: dbProject.id,
                dependencyId: dependency.id,
                currentVersion: updatedProjectDependency.currentVersion,
                installedVersion: updatedProjectDependency.installedVersion,
                newVersion: updatedProjectDependency.newVersion,
                type: updatedProjectDependency.type,
                createdDate: dbProjectDependency ? dbProjectDependency.createdDate : new Date(),
                modifiedDate: null,
            };
            const hasPropertiesBeenUpdated = this.hasPropertiesBeenUpdated(updatedDependency, dbProjectDependency, ['modifiedDate']);
            updatedDependency.modifiedDate = hasPropertiesBeenUpdated ? new Date() : dbProject.modifiedDate;
            return updatedDependency;
        });
    }

    saveNewDependencies(updatedProject: ISyncProjectDTO, dependencies: Dependency[]) {
        const newDependencies = updatedProject.dependencies.filter(x => !dependencies.some(ex => ex.key === x.key));
        const date = new Date();
        return this.dependencyService.addMany(newDependencies.map(x => ({
            key: x.key,
            title: x.title,
            license: x.license,
            repo: x.repo,
            createdDate: date,
            modifiedDate: date,
        } as Partial<Dependency>)));
    }

    hasPropertiesBeenUpdated(objA: any, objB: any, propertiesToIgnore: string[]) {
        if (objA && !objB || !objA && objB) {
            return true;
        }
        for (const property in objA) {
            if (objA.hasOwnProperty(property) && propertiesToIgnore.indexOf(property) === -1) {
                if (objA[property] !== objB[property]) {
                    return true;
                }
            }
        }
        return false;
    }

    promiseSerial(funcs) {
        return funcs.reduce((promise, func) =>
            promise.then(result => func().then(Array.prototype.concat.bind(result))),
            Promise.resolve([]));
    }

}
