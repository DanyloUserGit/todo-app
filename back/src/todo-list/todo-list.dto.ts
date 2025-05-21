import { IsString, IsUUID } from "class-validator";

export class TodoListDTO{
    @IsString()
    title:string;

    @IsUUID()
    creatorId:string;
}