import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {
    
    @IsString()
    id_categoria: string;

    @IsString()
    @MinLength(5)
    nombre:string;

    @IsString()
    @MinLength(3)
    img:string
    
    @IsString()
    @MinLength(5)
    @IsOptional()
    descripcion:string;
}

