import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name:'USERS'
})
export class Auth {

    @PrimaryColumn()
    email: string;

    @Column('text',{
        nullable: true
    })
    username: string;

    @Column('text',{
        nullable: true
    })
    password: string;

    //relación de 1 a 1 de Auth(User) <---> Cliente

}
