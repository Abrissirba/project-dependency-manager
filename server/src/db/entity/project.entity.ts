import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProject } from '../interfaces/i-project.model';
import { ProjectDependency } from './project-dependency.entity';
import { ProjectLocation } from './project-location.entity';

@Entity({
    name: 'Projects',
})
export class Project implements IProject {

    constructor(values: Partial<Project>) {
        Object.assign(this, values);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    title?: string;

    @Column({
        type: 'nvarchar',
        length: 'MAX',
        nullable: true,
    })
    description?: string;

    @Column({
        type: 'bit',
    })
    hasPackageLockFile: boolean;

    @Column({ type: 'datetime' })
    createdDate: string | Date;

    @Column({ type: 'datetime' })
    modifiedDate: string | Date;

    // JOIN COLUMNS
    @OneToMany(type => ProjectDependency, item => item.project, { cascade: ['insert', 'update', 'remove'], onUpdate: 'CASCADE' })
    dependencies: ProjectDependency[];

    @OneToOne(type => ProjectLocation, item => item.project)
    projectLocation: ProjectLocation;
}