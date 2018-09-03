import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectDependency } from './../db/entity/project-dependency.entity';
@Injectable()
export class ProjectDependenciesService {
    constructor(
        @InjectRepository(ProjectDependency) private readonly projectDependencyRepository: Repository<ProjectDependency>,
    ) { }

    async getAll(): Promise<ProjectDependency[]> {
        return this.projectDependencyRepository
            .createQueryBuilder('projectDependency')
            .leftJoinAndSelect('projectDependency.dependency', 'dependency')
            .getMany();
    }
}