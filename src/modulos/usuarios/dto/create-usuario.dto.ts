import { IsNumber, IsString, Matches, MinLength } from "class-validator";


export class CreateUsuarioDto {

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    rol: string;

    @IsString()
    instagram: string;

    //...

    
}
