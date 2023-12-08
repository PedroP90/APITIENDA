import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
  ) { }

  // listar todos los productos
  async showAllProds() {
    try {
      const producto = await this.productoRepository.find()
      return {
        message: 'listado de productos',
        data: producto,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todos los productos")
    }
  }

  // detalle de producto
  async detalle1prov(id_producto:number){
    const producto= await this.productoRepository.find({
      where:{id_producto}
    })
    return{
      message: 'detalle de producto',
      data: producto,
      status: 200
    }
  }

  // insertar producto
  async newProv(createProductoDto:CreateProductoDto){
    const producto = this.productoRepository.create(createProductoDto)
    await this.productoRepository.save(producto)
    console.log(createProductoDto)
    return{
      message: 'producto creado',
      data: producto,
      status: 200
    }
  }

  // eliminar producto
  async delete1Proc(id_producto:number){
    try {
      const producto = await this.productoRepository.findOne({
        where:{id_producto}
        })
      await this.productoRepository.remove(producto)
      return{
        message: 'producto eliminado',
        data: producto,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('error al eliminar producto')
    }
  }

  // actualizar producto
  async updateProv(id_producto:number,updateProductoDto:UpdateProductoDto){
     const producto = await this.productoRepository.findOne({
      where: { id_producto }
    })
    this.productoRepository.merge(producto,updateProductoDto)
    await this.productoRepository.save(producto)
    return{
      message: 'producto actualizado',
      data: producto,
      status: 200
    }
  }
}
