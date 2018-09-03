import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IDependency } from '../interfaces/i-dependency.model';
import { ProjectDependency } from './project-dependency.entity';

@Entity({
    name: 'Dependencies',
})
export class Dependency implements IDependency {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    title: string;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    repo?: string;

    @Column({
        type: 'nvarchar',
        nullable: true,
    })
    license?: string;

    @Column({ type: 'datetime' })
    createdDate: string | Date;

    @Column({ type: 'datetime' })
    modifiedDate: string | Date;

    // JOIN COLUMNS
    @OneToMany(type => ProjectDependency, item => item.dependency)
    projectDependencies: ProjectDependency[];
}