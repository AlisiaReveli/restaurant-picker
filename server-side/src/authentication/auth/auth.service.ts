import { Inject, Res, UnauthorizedException } from "@nestjs/common";
import { UserDataDto } from "./dto/userData.dto";
import { OAuth2Client } from 'google-auth-library';
import { UserService } from "src/api/users/user.service";
import * as bcrypt from 'bcryptjs';
export class AuthService {
    @Inject(UserService)
    private userService: UserService;

    async verifyUser(data: UserDataDto, @Res() res) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({ idToken: data.token, audience: process.env.GOOGLE_CLIENT_ID });
            const payload = ticket.getPayload();
            return payload || null;
        }
        catch (err) {
            return res.status(500).json({
                message: 'Wrong credentials'
            });
        }
    }

    async validateCredentials(email: string, password: string): Promise<any> {
        const user = await this.userService.findOne({ email: email.toLowerCase() });

        if (!user) {
            throw new UnauthorizedException({
                status: 'error',
                data: ['Email does not exist!'],
            });
        }

        return user && (await bcrypt.compare(password, user.googleId))
            ? user
            : null;
    }
}