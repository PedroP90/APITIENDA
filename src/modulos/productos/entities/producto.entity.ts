import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Producto {

    @PrimaryColumn('numeric')
    id_producto: number

    @Column('text', {
        nullable: false,
        unique: false
    })
    nombre: string;

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
        nullable:true
    })
    peso:number

    @Column('text',{
        unique:false,
        nullable:true
    })
    color:string

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
}