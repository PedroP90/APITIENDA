import { Categoria } from "src/modulos/categorias/entities/categoria.entity";
import { Proveedor } from "src/modulos/proveedor/entities/proveedor.entity";
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Productos {

    @PrimaryColumn('text')
    id_producto: string

    @Column('text', {
        nullable: false,
        unique: true
    })
    nombre: string;

    @Column('text',{
        unique:false,
        nullable:true
    })
    marca:string
    
    @Column('text',{
        unique:false,
        nullable:true
    })
    modelo:string

    @Column('text',{
        unique:false,
        nullable:true
    })
    descripcion:string

    @Column('numeric',{
        unique:false,
        nullable:true
    })
    stock:number

    @Column('numeric',{
        unique:false,
        nullable:true
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
        nullable:true
    })
    img:string

    @BeforeInsert()
    updateNombre(){
        if (this.nombre) {
            this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
        }
    }
    
    @ManyToOne(
        () => Proveedor,
        (proveedor) => proveedor.productos,
        {cascade: true}
    )
    proveedor:Proveedor

    @ManyToOne(
        () => Categoria,
        (idcat) => idcat.productos,
        {cascade: true}
    )
    categoria:Categoria
}