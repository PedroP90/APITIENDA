import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Categoria } from "src/modulos/categorias/entities/categoria.entity";

export class CreateProductoDto {
    
    @IsNumber()
    id_producto:number

    @IsString()
    @MinLength(5)
    nombre:string

    @IsString()
    @MinLength(2)
    marca:string

    @IsString()
    @MinLength(4)
    modelo:string

    @IsString()
    @MinLength(15)
    @IsOptional()
    descripcion:string

    @IsNumber()
    stock:number

    @IsNumber()
    precio:number

    @IsNumber()
    peso_kg:number

    @IsString()
    @MinLength(3)
    color:string

    @IsOptional()
    categoria?:string

    @IsString()
    @MinLength(3)
    proveedor:string
}
