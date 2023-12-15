import { Cliente } from "src/modulos/clientes/entities/cliente.entity";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";


@Entity()
export class Usuario {

    @PrimaryColumn('int',{
        nullable: false,
    }) 
    id: number;

    @Column('text',{
        nullable: true
    })
    nombreUsuario?: string;

    @Column('text',{
        nullable: true
    })
    mail: string;

    @Column('text',{
        nullable: true
    })
    password: string;


    // @Column('text',{
    //     nullable: true
    // })
    // nif?: string;

    @ManyToOne(
        () => Cliente,
        (cliente) => cliente.usuarios,
        {cascade: true}
    )
    cliente?: Cliente
}
