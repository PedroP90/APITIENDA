import { PrimaryColumn, Column, Entity } from "typeorm";

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
}
