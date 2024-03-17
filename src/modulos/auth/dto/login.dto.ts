import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginAuthDto {

    @IsEmail({}, {
        message: 'Invalid email'
    })
    @IsNotEmpty({
        message: 'email is required'
    })
    email: string;

    @IsString({
        message: 'Invalid password'
    })
    @IsNotEmpty({
        message: 'password is required'
    })
    @MinLength(6)
    @MaxLength(50)
    password: string;
    
}
