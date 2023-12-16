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
      return {
        message: 'listado de todos proveedores',
        data: provdata,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al listar todos los proveedores')
    }
  }

  // detalle proveedores
  async detalle1Prov(id_proveedor: number) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { id_proveedor }
      })
      return {
        message: "detalles del proveedor",
        data: proveedor,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al detallar proveedor')
    }
  }

  // insertar proveedores
  async newProv(createProveedorDto: CreateProveedorDto) {
    try {
      const proveedor = this.proveedorRepository.create(createProveedorDto)
      await this.proveedorRepository.save(proveedor)
      console.log(createProveedorDto)
      return {
        message: "Proveedor creado correctamente",
        data: proveedor,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al crear proveedor')
    }
  }

  // eliminar proveedor
  async delete1cat(id_proveedor: number) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: {
          id_proveedor
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
  async updateProv(id_proveedor: number, updateProveedorDto: UpdateProveedorDto) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { id_proveedor }
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
}
