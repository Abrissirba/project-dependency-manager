import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dependency } from './../db/entity/dependency.entity';

@Injectable()
export class DependencyService {
    constructor(
        @InjectRepository(Dependency) private readonly dependencyRepository: Repository<Dependency>,
    ) { }

    async getAll(): Promise<Dependency[]> {
        return this.dependencyRepository.createQueryBuilder().getMany();
    }

    async getById(id: number): Promise<Dependency> {
        return this.dependencyRepository.findOne(id);
    }

    async add(dependency: Partial<Dependency>) {
        const entityToSave = this.dependencyRepository.create(dependency);
        const dbEntity = await this.dependencyRepository.save(entityToSave);
        return this.getById(dbEntity.id);
    }

    async addMany(dependencies: Partial<Dependency>[]) {
        return Promise.all(dependencies.map(x => this.add(x)));
    }
}