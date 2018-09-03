import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDependency } from '../db/entity';
import { Project } from '../db/entity/project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    ) { }

    async getAll(): Promise<Project[]> {
        return this.getProjectQuery()
        .innerJoinAndSelect('project.projectLocation', 'projectLocation')
            .getMany();
    }

    async get(id: number): Promise<Project> {
        return this.getProjectQuery()
            .innerJoinAndSelect('project.projectLocation', 'projectLocation')
            .where('project.id = :id', { id })
            .getOne();
    }

    async getByLocationPath(paths: string[]) {
        if (paths.length === 0) {
            return Promise.resolve([]);
        }
        return this.projectRepository.createQueryBuilder('project')
            .innerJoinAndSelect('project.projectLocation', 'projectLocation')
            .leftJoinAndSelect('project.dependencies', 'dependencies')
            .where('projectLocation.path IN (:...paths)', { paths })
            .getMany();
    }

    async add(project: Project) {
        const projectToSave = this.projectRepository.create(project);
        const dbSession = await this.projectRepository.save(projectToSave);
        return this.get(dbSession.id);
    }

    async save(project: Project) {
        project.dependencies = project.dependencies ? project.dependencies.map(x => new ProjectDependency(x)) : [];
        if (!project.id) {
            project.createdDate = new Date();
            project.modifiedDate = new Date();
        }
        return this.projectRepository.save(project);
    }

    private getProjectQuery() {
        return this.projectRepository.createQueryBuilder('project')
            .leftJoinAndSelect('project.dependencies', 'projectDependencies')
            .leftJoinAndSelect('projectDependencies.dependency', 'dependency');
    }
}