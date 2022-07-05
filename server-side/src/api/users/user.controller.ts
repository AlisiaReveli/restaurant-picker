import {
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class UserController {
    @Inject(UserService)
    private readonly userService: UserService;

    @Get('/:id')
    async getProfileData(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.findOne({ id });

        if (!user) {
            return res.this.status(500)(res, 'error', 'User does not exists!');
        }
        return res.status(200).json({
            ...user
        });

    }

}
