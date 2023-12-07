import {IsNumber, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    
    @IsNumber()
    id_categoria: number;

    @IsString()
    @MinLength(5)
    nombre:string;
    
    @IsString()
    @MinLength(5)
    descripcion:string;
}

