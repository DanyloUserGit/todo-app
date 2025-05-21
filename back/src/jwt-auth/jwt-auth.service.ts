import { Injectable } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from './jwt-auth.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
        private jwtService: JwtService,
    ) {}
    async registration(body: RegistrationDTO){
        try {
            const {password} = body;
            const userExists = await this.userRepository.exists({where:{...body}});
            if (userExists) throw new Error("User already exists.");

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await this.userRepository.save({...body, password:hashedPassword});

            const token = await this.jwtService.sign(
                {id:user.id},  
                {secret:process.env.JWT_SECRET, expiresIn:"30d"}
            );
            return {token};
        } catch (error) {
            throw error;
        }
    }

    async login(body: LoginDTO){
        try {   
            const {email, password} = body;
            const userExists = await this.userRepository.exists({where:{email}});
            if (!userExists) throw new Error("User doesn`t exist.");

            const user = await this.userRepository.findOne({where:{email}});
            const match = bcrypt.compare(password, user.password);
            if (!match) throw new Error("Passwords don`t match.");

            const token = await this.jwtService.sign(
                {id:user.id},  
                {secret:process.env.JWT_SECRET, expiresIn:"30d"}
            );
            return {token};
        } catch (error) {
            throw error;
        }
    }
}