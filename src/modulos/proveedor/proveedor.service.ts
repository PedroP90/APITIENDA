import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {

  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>
  ) { }

  // listar todos los proveedores
  async showAllProvs() {
    try {
      const provdata = await this.proveedorRepository.find()
      return provdata
    } catch (error) {
      throw new InternalServerErrorException('fallo al listar todos los proveedores')
    }
  }

  // detalle proveedores
  async detalle1Prov(cif: string) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { 
          cif
        }
      })
      return proveedor;
    } catch (error) {
      throw new InternalServerErrorException('fallo al detallar proveedor')
    }
  }


  // insertar proveedores
  async newProv(CreateProveedorDto: CreateProveedorDto) {
    try {
      const proveedor = this.proveedorRepository.create(CreateProveedorDto)
      await this.proveedorRepository.save(proveedor)
      // console.log(createCategoriaDto)
      return {
        message: `proveedor creado`,
        data: proveedor,
        status: 200
      }
    } catch (error) {
    }
  }
  // eliminar proveedor
  async delete1Prov(cif: string) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: {
          cif
        }
      })
      await this.proveedorRepository.remove(proveedor)
      return {
        message: "proveedor eliminado con exito",
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('error al eliminar proveedor')
    }
  }

  // actualizar proveedor
  async updateProv(cif: string, updateProveedorDto: UpdateProveedorDto) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { cif }
      })
      this.proveedorRepository.merge(proveedor, updateProveedorDto)
      await this.proveedorRepository.save(proveedor)
      return {
        message: 'proveedor actualizado',
        data: proveedor,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al actualizar proveedor')
    }
  }

  // eliminar proveedores masivo
  async deleteAllProv(){
    const consulta=this.proveedorRepository.createQueryBuilder('proveedor');
    try {
      return await consulta.delete().where({}).execute()
    } catch (error) {
      throw new InternalServerErrorException('fallo al eliminar proveedores para carga masiva')
    }
  }
}
