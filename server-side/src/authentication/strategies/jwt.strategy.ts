import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // @Inject(UserService)
    // private readonly userService: UserService;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret || 'testkey',
        });
    }

    async validate(payload: any) {
        // const user = await this.userService.findOne({ id: payload.sub });
        // return { userId: user.id, email: user.email };
    }
}
