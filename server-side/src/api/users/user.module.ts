import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        UserService
    ],
    controllers: [UserController],
    exports: [UserService],
})
export class UsersModule { }
