import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";


export class RegisterAuthDto {

    @IsEmail({}, {
       message: 'Invalid email' 
    })
    @IsNotEmpty({
        message: 'email is required'
    })
    email: string;

    @IsString({
        message: 'Invalid username'
    })
    @IsOptional()
    username: string;

    @IsString({
        message: 'Invalid password'
    })
    @IsNotEmpty({
        message: 'password is required'
    })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener mayúsculas, minúsculas y números'
        })
    password: string;

    
}