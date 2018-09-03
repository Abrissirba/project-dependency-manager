import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IProjectDependency } from '../interfaces/i-project-dependency.model';
import { Dependency } from './dependency.entity';
import { Project } from './project.entity';

@Entity({
    name: 'ProjectDependencies',
})
export class ProjectDependency implements IProjectDependency {

    constructor(values: Partial<ProjectDependency>) {
        Object.assign(this, values);
    }

    @PrimaryColumn({
        type: 'int',
    })
    projectId: number;

    @PrimaryColumn({
        type: 'int',
    })
    dependencyId: number;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    currentVersion?: string;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    latestVersion?: string;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    installedVersion?: string;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    wantedVersion?: string;

    @Column({
        type: 'bit',
    })
    isDevDependency: boolean;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    bump?: string;

    @Column({ type: 'datetime' })
    createdDate: string | Date;

    @Column({ type: 'datetime' })
    modifiedDate: string | Date;

    // JOIN COLUMNS
    @ManyToOne(type => Project, project => project.dependencies, { cascade: ['insert', 'update'], onUpdate: 'CASCADE' })
    project?: Project;

    @ManyToOne(type => Dependency, dependency => dependency.projectDependencies)
    dependency?: Dependency;
}