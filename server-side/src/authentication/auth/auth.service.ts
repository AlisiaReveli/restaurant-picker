import { Inject, Res, UnauthorizedException } from "@nestjs/common";
import { UserDataDto } from "./dto/userData.dto";
import { OAuth2Client } from 'google-auth-library';
import { UserService } from "src/api/users/user.service";
import * as bcrypt from 'bcrypt';
export class AuthService {
    @Inject(UserService)
    private userService: UserService;

    async verifyUser(data: UserDataDto, @Res() res) {

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: data.googleId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const email = payload['email'];
            if (email === data.email) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
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