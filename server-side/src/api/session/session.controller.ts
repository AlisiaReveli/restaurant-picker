import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/authentication/decorators/currentUser.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { AccessSessionDto } from './dto/accessSession.dto';
import { SessionService } from './session.service';

@Controller('session')
// @UseGuards(JwtAuthGuard)
@ApiTags('Session')
// @ApiBearerAuth('access-token')
export class SessionController {
    @Inject(SessionService)
    private readonly sessionService: SessionService;

    @Get('/access/code')
    async getSession(@Res() res, @CurrentUser() user: User) {
        const accessId = Date.now();
        const session = await this.sessionService.create({
            accessId,
            creatorId: user.id,
        });
        if (session) {
            return res.status(200).json({
                'session-Access-Id': accessId,
            });
        } else {
            return res.status(500).json({
                'error': 'Something went wrong',
            });
        }

    }

    @Post('/access')
    async accessSession(@Res() res, @CurrentUser() user: User, @Body() accessSession: AccessSessionDto) {
        const session = await this.sessionService.findOne(
            {
                accessId: accessSession.code,
            },
        );
        if (session) {
            return res.status(200).json({
                ...session,
            });
        } else {
            return res.status(500).json({
                'error': 'Something went wrong',
            });
        }



    }

}
