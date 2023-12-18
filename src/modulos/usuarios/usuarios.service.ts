import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { ClientesService } from '../clientes/clientes.service';
import { UsupaginationDTO } from './dto/usupagination.dto';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly clienteRepository: ClientesService
  ){

  }


  async create(createUsuarioDto: CreateUsuarioDto) {
    try{
        const {cliente, ...campos } = createUsuarioDto;
        const usuario = this.usuarioRepository.create({...campos});
        const clienteobj = await this.clienteRepository.findOne(cliente);      
        //console.log(clienteobj);
        usuario.cliente = clienteobj; // dirección del objeto autor relacionado con libros
      await this.usuarioRepository.save(usuario);
        
        return {
        msg: 'Usuario correctamente insertado',
        data: usuario,
        status:200
      }
    }catch(error){
      //console.log(error)
      throw new InternalServerErrorException('sysadmin...');
    }
  }

  // @Post()
  // async create(createUsuarioDto: CreateUsuarioDto) {
  //   try{
  //     const usuario = this.usuarioRepository.create(createUsuarioDto);
  //     await this.usuarioRepository.save(usuario);
  //     return {
  //       msg: 'Registro Insertado',
  //       data: usuario,
  //       status:200
  //     };
  //   }catch(error){
  //     throw new InternalServerErrorException('Póngase en contacto con el Sysadmin')
  //   }
  // }

  // async findAll() {
  //   try {
  //     const usuarios = await this.usuarioRepository.find()
  //     return {
  //       data: usuarios,
  //       message: 'Listado de los usuarios',
  //       status: 200
  //     }
  //   } catch (error) {
  //     throw new InternalServerErrorException("fallo al listar todas las categorias")
  //   }
  // }

  async findAll(usupaginationDto: UsupaginationDTO) {
    const { limit, offset } = usupaginationDto;
    let usuario = await this.usuarioRepository.find()
    return this.usuarioRepository.find({
        take: limit,
        skip: offset
    });
    // return {
    //     data: libros,
    //     msg: "listado de libros",
    //     status: 200
    // }
}

  

  findOne(nombreUsuario: string) {
    const cliente = this.usuarioRepository.findOne({
      where:{
        nombreUsuario
      },
      relations: {
        cliente: true
      }
    });
    return cliente;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(nombreUsuario: string) {
    const cliente = await this.usuarioRepository.findOneBy({ nombreUsuario });
    await this.usuarioRepository.remove(cliente);
    return 'Usuario eliminado'
  }

  async deleteAllUsuarios(){
    const query = this.usuarioRepository.createQueryBuilder('usuario');
    try{
      return await query
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin...')
    }
  }
}
