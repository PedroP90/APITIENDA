import { Producto } from "src/modulos/productos/entities/producto.entity";
import { PrimaryColumn, Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryColumn('numeric')
    id_categoria:number

    @Column('text',{
        nullable:false,
        unique:true
    })
    nombre:string

    @Column('text',{
        nullable:true,
        unique:false
    })
    descripcion: string

    @OneToMany(
        ()=>Producto,
        (producto)=> producto.categoria
    )
    productos?:Producto[]
}
