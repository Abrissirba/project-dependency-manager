import { Controller, Get } from '@nestjs/common';
import { ProjectDependenciesService } from '../services/project-dependencies.service';

@Controller('project-dependencies')
export class ProjectDependenciesController {
  constructor(
      private readonly projectDependenciesService: ProjectDependenciesService,
  ) {}

  @Get()
  async get() {
    const projectDependencies = await this.projectDependenciesService.getAll();
    return projectDependencies;
  }
}
