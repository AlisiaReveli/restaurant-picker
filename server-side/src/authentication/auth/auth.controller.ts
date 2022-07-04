import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "src/entities/user.entity";
import { UserDataDto } from "./dto/userData.dto";
import { JwtService } from "@nestjs/jwt";

@ApiTags('Authentication')
@Controller('auth')
@ApiExtraModels()
export class AuthController {
    @InjectRepository(User)
    private usersRepository: Repository<User>;
    @Inject(JwtService)
    private jwtService: JwtService;

    @Post()
    async register(@Body() userdata: UserDataDto, @Res() res) {

        const user = await this.usersRepository.findOne({
            where: {
                email: userdata.email,
                googleId: userdata.googleId
            }
        });

        if (user) {
            const accessToken = this.jwtService.sign({ email: user.email, sub: user.googleId })

            return res.status(200).json({
                accessToken
            });
        } else {

            const user = await this.usersRepository.create({
                email: userdata.email,
                googleId: userdata.googleId,
                name: userdata.name
            });
            await this.usersRepository.save(user);

            if (user) {
                const accessToken = this.jwtService.sign({ email: user.email, sub: user.googleId })

                return res.status(200).json({
                    accessToken
                });
            } else {
                return res.status(500).json({
                    message: 'Something went wrong'
                });
            }


        }
    }


}
