import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';


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
}
