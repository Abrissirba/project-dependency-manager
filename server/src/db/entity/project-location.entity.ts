import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProjectLocation } from '../interfaces/i-project-location.model';
import { Project } from './project.entity';

@Entity({
    name: 'ProjectLocations',
})
export class ProjectLocation implements IProjectLocation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    title?: string;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    path: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    projectId?: number;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    ignoreDate?: string | Date;

    @Column({ type: 'datetime' })
    createdDate: string | Date;

    // JOIN COLUMNS
    @OneToOne(type => Project, item => item.projectLocation)
    @JoinColumn()
    project?: Project;
}