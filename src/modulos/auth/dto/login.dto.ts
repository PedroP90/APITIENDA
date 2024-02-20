import { IsNumber, IsString, Matches, MinLength } from "class-validator";


export class LoginAuthDto {

    @IsString()
    email: string;

    @IsString()
    password: string;

    
}
