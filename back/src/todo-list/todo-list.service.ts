import { Injectable } from '@nestjs/common';
import { TodoListDTO } from './todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './todo-list.entity';
import { Repository } from 'typeorm';
import { Collaborator } from './colaborator.entity';
import { ROLES } from 'src/types';

@Injectable()
export class TodoListService {
    constructor (
        @InjectRepository(TodoList)
        private readonly todoListRepository: Repository<TodoList>,

        @InjectRepository(Collaborator)
        private readonly collaboratorRepository: Repository<Collaborator>,
    ) {}
    async createTodoList(body: TodoListDTO){
        try {
            const {title, creatorId} = body;
            const collaborator = await this.collaboratorRepository.save({
                userId:creatorId,
                role: ROLES.CREATOR,
                todoList:null
            });
            if(!collaborator) throw new Error("Unable to save \"creator\" collaborator");

            const todoList = await this.todoListRepository.create({
                title,
                collaborators:[collaborator]
            });
            collaborator.todoList=todoList;
            await this.collaboratorRepository.save(collaborator);
        } catch (error) {
            throw error;
        }
    }
}
