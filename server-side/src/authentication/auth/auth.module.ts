import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { jwtConstants } from '../constants';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/api/users/user.service';
import { UsersModule } from 'src/api/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' },
        }),
        UsersModule,
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [
        LocalStrategy,
        JwtStrategy,
        AuthService,
        UserService
    ],
})
export class AuthModule { }
