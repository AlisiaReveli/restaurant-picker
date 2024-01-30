import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [AuthModule, UsersModule, SessionModule,RestaurantsModule],

})
export class ApiModule { }
