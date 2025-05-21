import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListModule } from './todo-list/todo-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UserModule, 
    JwtAuthModule, TodoListModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
