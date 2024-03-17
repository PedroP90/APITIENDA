import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { IsNull } from "typeorm";


export class CreateProductoDto {
    
    @IsString()
    id_producto:string

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

    @IsString()
    @MinLength(3)
    img:string

    @IsString()
    @IsOptional()
    categoria:string

    @IsOptional()
    @IsString()
    proveedor:string
}
