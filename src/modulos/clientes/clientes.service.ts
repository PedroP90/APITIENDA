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

  async create(createClienteDto: CreateClienteDto) {
    try{
      const cliente = this.clienteRepository.create(createClienteDto);
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
  

  findOne(nif: string) {
    const cliente = this.clienteRepository.findOne({
      where:{
        nif
      }
    });
    return cliente;
  }

  async update(nif: string, updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { nif }
      })
      this.clienteRepository.merge(cliente, updateClienteDto);
      await this.clienteRepository.save(cliente);
      return {
        message: `Categoría con ID ${nif} actualizada correctamente`,
        data: cliente,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la categoría.');
    }
  }

  async remove(nif: string) {
    const cliente = await this.clienteRepository.findOneBy({ nif });
    await this.clienteRepository.remove(cliente);
  }

  async deleteAllClientes(){
    const query = this.clienteRepository.createQueryBuilder('cliente');
    try{
      return await query
        .delete()
        .where({})
        .execute()
    }catch(error){
      
    }
  }
}
