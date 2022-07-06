import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UserDataDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;
}
