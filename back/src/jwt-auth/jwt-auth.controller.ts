import { JwtAuthService } from './jwt-auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from './jwt-auth.dto';

@Controller('jwt-auth')
export class JwtAuthController {
    constructor (private readonly jwtAuthService:JwtAuthService) {}
    
    @Post("login")
    async login(
        @Body() body:LoginDTO
    ){
        try {
            const tokens = await this.jwtAuthService.login(body);
            return tokens;
        } catch (error) {
            throw error;
        }
    }
    @Post("reg")
    async registration(
        @Body() body: RegistrationDTO
    ){
        try {
            const tokens = await this.jwtAuthService.registration(body);
            return tokens;
        } catch (error) {
            throw error;
        }
    }
}
