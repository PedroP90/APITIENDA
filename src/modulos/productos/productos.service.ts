import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CategoriasService } from '../categorias/categorias.service';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ProveedorService } from '../proveedor/proveedor.service';

@Injectable()
export class ProductosService {

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private readonly categoriaService: CategoriasService,
    private readonly proveedorService: ProveedorService
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
  async detalle1prov(id_producto:string){
    const producto= await this.productoRepository.find({
      where:{
        id_producto
      },
      relations: {
        categoria: true,
        proveedor: true
      }
    })
    return{
      message: 'detalle de producto',
      data: producto,
      status: 200
    }
  }

  async newProd(createProductoDto: CreateProductoDto) {
    try{
        const {categoria, proveedor, ...campos } = createProductoDto;
        const producto = this.productoRepository.create({...campos});
        const categoriaobj = await this.categoriaService.detalle1cat(categoria);
        const proveedorobj = await this.proveedorService.detalle1Prov(proveedor);      
        
        producto.categoria = categoriaobj; // direccion del objeto autor relacionado con libros    
        producto.proveedor = proveedorobj
        await this.productoRepository.save(producto);
        
        return {
        msg: 'Producto correctamente insertado',
        data: producto,
        status:200
      }
    }catch(error){
      console.log(error)
      throw new InternalServerErrorException('sysadmin...');
    }
  }

  // async newProd(createProductoDto: CreateProductoDto) {
  //   try{
  //     const cliente = this.productoRepository.create(createProductoDto);
  //     await this.productoRepository.save(cliente);
  //     return {
  //       msg: 'Registro Insertado',
  //       data: cliente,
  //       status:200
  //     };
  //   }catch(error){
  //     throw new InternalServerErrorException('Póngase en contacto con el Sysadmin')
  //   }
  // }

  // eliminar producto
  async delete1Proc(id_producto:string){
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
  // async updateProv(id_producto:number,updateProductoDto:UpdateProductoDto){
  //    const producto = await this.productoRepository.findOne({
  //     where: { id_producto }
  //   })
  //   this.productoRepository.merge(producto,updateProductoDto)
  //   await this.productoRepository.save(producto)
  //   return{
  //     message: 'producto actualizado',
  //     data: producto,
  //     status: 200
  //   }
  // }

  update(id_producto:number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${+id_producto} usuario`;
  }

  // eliminar cateogiras masivo
  async deleteAllProcs(){
    const consulta=this.productoRepository.createQueryBuilder('producto');
    try {
      return await consulta.delete().where({}).execute()
    } catch (error) {
      throw new InternalServerErrorException('fallo al eliminar categorias para carga masiva')
    }
  }


}
