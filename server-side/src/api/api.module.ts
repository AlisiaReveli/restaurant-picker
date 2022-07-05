import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth/auth.module';
import { User } from 'src/entities/user.entity';
import { UserController } from './users/user.controller';
import { UsersModule } from './users/user.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class ApiModule { }
