import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantService } from './restaurants.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        RestaurantService
    ],
    controllers: [RestaurantsController],
    exports: [RestaurantService],
})
export class RestaurantsModule { }
