import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectLocation } from '../db/entity/project-location.entity';
import { ISyncProjectLocationDTO } from '../models/i-sync-project-location-dto.model';
import { ProjectLocationService } from '../services/project-location.service';

@Controller('project-locations')
export class ProjectLocationsController {
  constructor(
      private readonly projectLocationService: ProjectLocationService,
  ) {}

  @Get()
  async get() {
    const projectLocations = await this.projectLocationService.getAll();
    return projectLocations;
  }

  @Put('ignore/:id')
  async ignore(@Param() params) {
    const projectLocation = await this.projectLocationService.ignore(Number(params.id));
    return projectLocation;
  }

  @Post()
  async post(@Body() projectLocations: ISyncProjectLocationDTO[]) {
    const existingProjectLocations = await this.projectLocationService.getExistingByPath(projectLocations.map(x => x.path));
    const newProjectLocations = projectLocations.filter(x => !existingProjectLocations.some(ex => ex.path.toLowerCase() === x.path.toLowerCase()));
    await this.projectLocationService.addMany(newProjectLocations.map(x => ({
        ...x,
        createdDate: new Date(),
        ignoreDate: null,
    } as ProjectLocation)));

    return existingProjectLocations.filter(x => !!x.projectId);
  }
}
