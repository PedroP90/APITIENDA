import { Categoria } from "src/modulos/categorias/entities/categoria.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryColumn('numeric')
    id_producto: number

    @Column('text', {
        nullable: false,
        unique: true
    })
    nombre: string;

    @Column('text',{
        unique:false,
        nullable:false
    })
    marca:string
    
    @Column('text',{
        unique:false,
        nullable:false
    })
    modelo:string

    @Column('text',{
        unique:false,
        nullable:true
    })
    descripcion:string

    @Column('numeric',{
        unique:false,
        nullable:false
    })
    stock:number

    @Column('numeric',{
        unique:false,
        nullable:false
    })
    precio:number

    @Column('numeric',{
        unique:false,
        nullable:true
    })
    peso_kg:number

    @Column('text',{
        unique:false,
        nullable:true
    })
    color:string

    @Column('text',{
        unique:false,
        nullable:false
    })
    proveedor:string

    @Column('text',{
        unique:false,
        nullable:false
    })
    categoria?:string
}