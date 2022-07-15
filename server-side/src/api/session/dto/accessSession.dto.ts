import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class AccessSessionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;
}
