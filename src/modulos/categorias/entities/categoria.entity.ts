import { Productos } from "src/modulos/productos/entities/producto.entity";
import { PrimaryColumn, Column, Entity, OneToMany, BeforeInsert } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryColumn('text',{
        nullable: false,
    })
    id_categoria: string

    @Column('text',{
        nullable:false,
        unique:true
    })
    nombre:string

    @Column('text',{
        unique:false,
        nullable:true
    })
    img:string

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

    @OneToMany(
        ()=> Productos,
        (producto)=> producto.categoria,
        { eager: true }
    )
    productos?: Productos[]



}
