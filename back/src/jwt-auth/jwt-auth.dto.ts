import { IsString } from "class-validator";

export class RegistrationDTO{
    @IsString()
    email:string;

    @IsString()
    fullName:string;

    @IsString()
    password:string;
}

export class LoginDTO{
    @IsString()
    email:string;

    @IsString()
    password:string;
}