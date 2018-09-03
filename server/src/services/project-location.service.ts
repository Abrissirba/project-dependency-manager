import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectLocation } from '../db/entity/project-location.entity';

@Injectable()
export class ProjectLocationService {
    constructor(
        @InjectRepository(ProjectLocation) private readonly projectLocationRepository: Repository<ProjectLocation>,
    ) { }

    async getAll(): Promise<ProjectLocation[]> {
        return this.projectLocationRepository
            .createQueryBuilder('projectLocation')
            .leftJoinAndSelect('projectLocation.project', 'project')
            .getMany();
    }

    async getById(id: number): Promise<ProjectLocation> {
        return this.projectLocationRepository.findOne(id);
    }

    async getByProjectIds(projectIds: number[]): Promise<ProjectLocation[]> {
        if (projectIds.length === 0) {
            Promise.resolve([]);
        }
        return this.projectLocationRepository.createQueryBuilder().where('projectId IN (:...projectIds)', { projectIds }).getMany();
    }

    async getExistingByPath(paths: string[]) {
        if (paths.length === 0) {
            Promise.resolve([]);
        }
        return this.projectLocationRepository.createQueryBuilder().where('path IN (:...paths)', { paths }).getMany();
    }

    async add(projectLocation: ProjectLocation) {
        const projectToSave = this.projectLocationRepository.create(projectLocation);
        const dbProject = await this.projectLocationRepository.save(projectToSave);
        return this.getById(dbProject.id);
    }

    async addMany(projectLocations: ProjectLocation[]) {
        return Promise.all(projectLocations.map(x => this.add(x)));
    }

    async update(id: number, projectLocation: Partial<ProjectLocation>) {
        await this.projectLocationRepository.createQueryBuilder()
            .update(ProjectLocation)
            .set(projectLocation)
            .where('id = :id', { id })
            .execute();
        return this.getById(id);
    }

    async ignore(id: number) {
        return this.update(id, { ignoreDate: new Date() });
    }
}