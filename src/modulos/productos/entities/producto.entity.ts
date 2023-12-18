import { Categoria } from "src/modulos/categorias/entities/categoria.entity";
import { Proveedor } from "src/modulos/proveedor/entities/proveedor.entity";
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

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

    @BeforeInsert()
    updateNombre(){
        if (this.nombre) {
            this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
        }
    }

    // @Column('text',{
    //     unique:false,
    //     nullable:false
    // })
    // proveedor:string
    
    @ManyToOne(
        () => Proveedor,
        (proveedor) => proveedor.productos,
        {cascade: true}
    )
    proveedor?:Proveedor


    // @Column('text',{
    //     unique:false,
    //     nullable:false
    // })
    // categoria:string


    @ManyToOne(
        () => Categoria,
        (idcat) => idcat.productos,
        {cascade: true}
    )
    categoria?:Categoria
}