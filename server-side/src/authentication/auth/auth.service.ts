import { Inject } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

export class AuthService {
    @Inject(JwtService)
    private jwtService: JwtService;

    //     // @Inject(UserService)
    //     // private userService: UserService;
    //     async signup(user: RegisterUserDto) {
    //         let createdUser: User;

    //         try {
    //             const foundUser = await this.userService.findOne({ email: user.email });

    //             if (foundUser) {
    //                 throw new HttpException(
    //                     {
    //                         message: 'Input data validation failed',
    //                         errors: { email: 'Email is already in use!' },
    //                     },
    //                     HttpStatus.UNPROCESSABLE_ENTITY,
    //                 );
    //             }

    //             user.password = await bcrypt.hash(user.password, 10);
    //             user.role = UserRole.MENTEE;

    //             createdUser = await this.userService.register(user);
    //         } catch (error) {
    //             throw new HttpException(error.response, error.status);
    //         }

    //         if (!createdUser) {
    //             throw new HttpException(
    //                 'Validation failed!',
    //                 HttpStatus.UNPROCESSABLE_ENTITY,
    //             );
    //         }
    //         return true;
    //     }
}