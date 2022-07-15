import {
    Controller,
    Get,
    Inject,
    Req,
    Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guards/jwt-auth.guard';
import { RestaurantService } from './restaurants.service';

@Controller('restaurants')
// @UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth('access-token')
export class RestaurantsController {
    @Inject(RestaurantService)
    private readonly restaurantService: RestaurantService;

    @Get()
    async getAll(@Res() res, @Req() req) {
        const data = await this.restaurantService.findAll(req);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(500).json({ message: 'Not found' });
        }
    }

}
