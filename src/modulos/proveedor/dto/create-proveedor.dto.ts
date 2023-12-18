import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateProveedorDto {

    @IsString()
    @MinLength(3)
    nombre:string

    @IsString()
    @MinLength(9)
    cif:string

    @IsString()
    @MinLength(9)
    @IsOptional()
    telefono:string

    @IsString()
    @MinLength(4)
    @IsOptional()
    mail:string

    @IsString()
    @MinLength(4)
    @IsOptional()
    pais:string

    @IsString()
    @MinLength(4)
    @IsOptional()
    codigo_postal:string

    @IsString()
    @MinLength(4)
    @IsOptional()
    direccion:string
}