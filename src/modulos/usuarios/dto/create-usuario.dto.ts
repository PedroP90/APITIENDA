import { IsNumber, IsString, MinLength } from "class-validator";


export class CreateUsuarioDto {

    @IsNumber()
    id: number;

    @IsString()
    @MinLength(5)
    nombreUsuario: string;

    @IsString()
    @MinLength(5)
    mail: string;

    @IsString()
    @MinLength(5)
    password: string;

    @IsString()
    @MinLength(9)
    cliente?: string;
}
