import { DataSource, Repository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";


@Injectable()
export class UsuarioRepository extends Repository<Usuario>{
    constructor (private datasource: DataSource){
        super(Usuario, datasource.createEntityManager())
    }

    async findByEmail(email: string){
        try{
            return await this.createQueryBuilder('USERS')
                             .where(`email = :value`, {value: email})
                             .getOne()
        }catch (error){
            throw new InternalServerErrorException('Error al buscar el email')
        }
    }

    async findByUsername(username: string){
        try{
            return await this.createQueryBuilder('USERS')
                             .where(`username = :value`, {value: username})
                             .getOne()
        }catch (error){
            throw new InternalServerErrorException('Error al buscar el nombre de usuario')
        }
    }
}