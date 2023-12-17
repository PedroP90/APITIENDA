import { Entity, PrimaryColumn,Column } from "typeorm";

@Entity()
export class Proveedor {
    @PrimaryColumn('numeric')
    id_proveedor:number

    @Column('text',{
        nullable:false,
        unique:true
    })
    nombre:string

    @Column('text',{
        nullable:false,
        unique:true
    })
    cif:string

    @Column('text',{
        nullable:true,
        unique:false
    })
    telefono:string

    @Column('text',{
        nullable:true,
        unique:false
    })
    mail:string
    
    @Column('text',{
        nullable:true,
        unique:false
    })
    pais:string
    
    @Column('text',{
        nullable:true,
        unique:false
    })
    codigo_postal:string
    
    @Column('text',{
        nullable:true,
        unique:false
    })
    direccion:string
}

