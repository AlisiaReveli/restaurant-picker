import { Module } from '@nestjs/common';
import { AuthModule } from 'src/authentication/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule { }
