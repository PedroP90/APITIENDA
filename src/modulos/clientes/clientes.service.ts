import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ){

  }

  @Post()
  async create(createClienteDto: CreateClienteDto) {
    try{
      // el objeto (CreateClienteDto) del controlador
      // lo prepara en el objeto (autor) para ser INSERTADO en el SGBD
      const cliente = this.clienteRepository.create(createClienteDto);
      

      // lanza la petición de inserción a la BD
      // Mapea Objeto autor <--> registro autor
      // insert into Autor(isbb, nombre) values ("1", "Glenn Smith")
      // aplica la librería de bd instalada en el proyecto --> librería de postgres pg
      await this.clienteRepository.save(cliente);
      

      return {
        msg: 'Registro Insertado',
        data: cliente,
        status:200
      };
    }catch(error){
      throw new InternalServerErrorException('Póngase en contacto con el Sysadmin')
    }
  }

  async findAll() {
    try {
      const clientes = await this.clienteRepository.find()
      return {
        data: clientes,
        message: 'Listado de los clientes',
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todas las categorias")
    }
  }
  // async findAll(paginationDto: PaginationDTO) {
  //   const { limit, offset } = paginationDto;
  //   let clientes = await this.clienteRepository.find()
  //   return this.clienteRepository.find({
  //       take: limit,
  //       skip: offset
  //   });
  // }

  findOne(nif: string) {
    const cliente = this.clienteRepository.findOne({
      where:{
        nif
      }
    });
    return cliente;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
