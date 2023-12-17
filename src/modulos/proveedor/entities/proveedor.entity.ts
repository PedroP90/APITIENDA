import { Producto } from "src/modulos/productos/entities/producto.entity";
import { Entity, PrimaryColumn,Column, BeforeInsert, OneToMany } from "typeorm";

@Entity()
export class Proveedor {
    @PrimaryColumn('text')
    id_proveedor:string

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
        unique:true
    })
    telefono:string

    @Column('text',{
        nullable:true,
        unique:true
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

    @BeforeInsert()
    updateNombre(){
        if (this.nombre) {
            this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
        }
    }

    @OneToMany(
        ()=> Producto,
        (producto)=> producto.proveedor,
        { eager: true }
    )
    productos?: Producto[]
    
}

