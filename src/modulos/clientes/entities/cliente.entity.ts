import { Usuario } from 'src/modulos/usuarios/entities/usuario.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';


@Entity()
export class Cliente {

    @PrimaryColumn('text',{
        nullable: false,
    }) 
    nif: string;

    @Column('text',{
        nullable: true
    })
    nombre: string;

    @BeforeInsert()
    updateNombre(){
        if (this.nombre) {
            this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1);
        }
    }
    
    @Column('text',{
        nullable: true
    })
    apellidos: string;

    @Column('text',{
        nullable: true
    })
    direccion: string;

    @Column('text',{
        nullable: true
    })
    provincia: string;

    @Column('text',{
        nullable: true
    })
    localidad: string;

    @Column('text',{
        nullable: true
    })
    codigo_postal: string;

    @OneToMany(
        () => Usuario,
        (usuario) => usuario.cliente,
        { eager: true }
    )
    usuarios?: Usuario[]
}
