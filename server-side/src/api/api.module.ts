import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [AuthModule, UsersModule, RestaurantsModule],
})
export class ApiModule { }
