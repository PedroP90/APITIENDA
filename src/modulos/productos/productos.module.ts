import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './entities/producto.entity';
import { CategoriasModule } from '../categorias/categorias.module';
import { ProveedorModule } from '../proveedor/proveedor.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports:[
    TypeOrmModule.forFeature([Productos]),
    CategoriasModule,
    ProveedorModule
  ],
  exports:[
    TypeOrmModule,ProductosService
  ]
})
export class ProductosModule {}
