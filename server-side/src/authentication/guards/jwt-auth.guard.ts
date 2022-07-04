import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );

        if (isPublic) {
            return true;
        }

        if (!user || info instanceof JsonWebTokenError) {
            throw new UnauthorizedException({
                status: 'not_authorized',
                data: ['Invalid Token!'],
            });
        }
        return super.handleRequest(err, user, info, context, status);
    }
}
