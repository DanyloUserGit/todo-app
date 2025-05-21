import { ROLE, ROLES } from 'src/types';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class Collaborator{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type:"enum",
        enum:Object.values(ROLES),
        default:ROLES.VIEWER
    })
    role:ROLE;

    @Column({type:"uuid"})
    userId:string;

    @ManyToOne(() => TodoList, (todoList) => todoList.collaborators, {nullable:true})
    todoList: TodoList
}