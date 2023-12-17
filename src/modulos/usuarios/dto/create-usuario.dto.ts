import { IsNumber, IsString, Matches, MinLength } from "class-validator";


export class CreateUsuarioDto {

    @IsString()
    @MinLength(5)
    nombreUsuario: string;

    @IsString()
    @MinLength(5)
    mail: string;

    @IsString()
    @MinLength(5)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe tener mayúsculas, minúsculas y números'
        })
    password: string;

    @IsString()
    @MinLength(9)
    cliente?: string;
}
