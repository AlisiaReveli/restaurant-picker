import { Body, Controller, Get, Inject, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { UserDataDto } from "./dto/userData.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/api/users/user.service";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { User } from "src/entities/user.entity";
import { CurrentUser } from "../decorators/currentUser.decorator";
import * as bcrypt from 'bcryptjs';


@ApiTags('Authentication')
@Controller('auth')
@ApiExtraModels()
export class AuthController {
    @Inject(JwtService)
    private jwtService: JwtService;
    @Inject(UserService)
    private userService: UserService;
    @Inject(AuthService)
    private authService: AuthService;

    @Post()
    async register(@Body() userdata: UserDataDto, @Res() res) {
        const user = await this.userService.findOne(
            {
                email: userdata.email,
            }
        );

        if (user) {
            const verifyLoggedUser = await this.authService.validateCredentials(userdata.email, userdata.googleId);
            if (verifyLoggedUser) {

                const accessToken = this.jwtService.sign({ email: user.email, sub: user.id })

                return res.status(200).json({
                    accessToken
                });
            } else {
                return res.status(500).json({
                    message: 'Wrong credentials'
                });
            }
        } else {
            const verifyUser = await this.authService.verifyUser(userdata, res);

            if (verifyUser && verifyUser! === null) {
                const user = await this.userService.create({
                    email: userdata.email,
                    googleId: await bcrypt.hash(userdata.googleId, 10),
                    name: userdata.name
                });
                if (user) {
                    const accessToken = this.jwtService.sign({ email: user.email, sub: user.id })

                    return res.status(200).json({
                        accessToken
                    });
                } else {
                    return res.status(500).json({
                        message: 'Something went wrong'
                    });
                }
            } else {
                return res.status(500).json({
                    message: 'Something went wrong'
                });
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Get('/me')
    async getMe(@CurrentUser() user: User, @Res() res) {
        if (user) {
            return res.status(200).json({
                ...user
            });
        } else {
            return res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }


}
