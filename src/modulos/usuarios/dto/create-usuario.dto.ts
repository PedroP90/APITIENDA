import { IsNumber, IsOptional, IsString, Matches, MinLength } from "class-validator";


export class CreateUsuarioDto {

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    rol: string;

    @IsString()
    @IsOptional()
    instagram: string;

    //...

    
}
