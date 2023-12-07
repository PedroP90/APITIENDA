import { IsString, MinLength } from "class-validator";



export class CreateClienteDto {

    @IsString()
    @MinLength(9)
    nif: string;

    @IsString()
    @MinLength(3)
    nombre: string;

    @IsString()
    @MinLength(3)
    apellidos: string;

    @IsString()
    @MinLength(1)
    direccion: string;

    @IsString()
    @MinLength(1)
    provincia: string;

    @IsString()
    @MinLength(1)
    localidad: string;

    @IsString()
    @MinLength(1)
    codigo_postal: string;
    
}
