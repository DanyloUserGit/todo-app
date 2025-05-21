import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Collaborator } from './colaborator.entity';

@Entity()
export class TodoList{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type:"varchar", length: 255})
    title:string;

    @OneToMany(() => Collaborator, (collaborator) => collaborator.todoList, {cascade:true, eager: true})
    collaborators: Collaborator[]
}