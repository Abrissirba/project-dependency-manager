import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProjectLocationsController } from './controllers/project-locations.conroller';
import { ProjectsController } from './controllers/projects.controller';
import { Dependency, Project } from './db/entity';
import { ProjectDependency } from './db/entity/project-dependency.entity';
import { ProjectLocation } from './db/entity/project-location.entity';
import { DependencyService } from './services/dependency.service';
import { ProjectLocationService } from './services/project-location.service';
import { ProjectService } from './services/project.service';

const ormConfig: any = {
  type: 'mssql',
  host: 'MARCUS',
  username: 'VersionCheckerAdmin',
  password: 'password',
  database: 'version-checker',
  synchronize: true,
  options: {
      encrypt: true,
  },
  entities: [
      'src/db/entity/**/*.ts',
   ],
};

const entities = [
  Project,
  ProjectLocation,
  ProjectDependency,
  Dependency,
];

const providers = [
  ProjectService,
  ProjectLocationService,
  DependencyService,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [
    AppController,
    ProjectsController,
    ProjectLocationsController,
  ],
  providers,
})
export class AppModule {}
