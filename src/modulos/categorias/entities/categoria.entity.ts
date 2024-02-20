import { Producto } from "src/modulos/productos/entities/producto.entity";
import { PrimaryColumn, Column, Entity, OneToMany, BeforeInsert } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryColumn('text')
    id_categoria: string

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
    // productos:string;

    @OneToMany(
        ()=> Producto,
        (producto)=> producto.categoria,
        { eager: true }
    )
    productos?: Producto[]



}
