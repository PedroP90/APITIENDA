import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { ProveedorModule } from '../proveedor/proveedor.module';
import { ProductosService } from '../productos/productos.service';
import { ProductosModule } from '../productos/productos.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    CategoriasModule,
    ClientesModule, 
    UsuariosModule,
    ProveedorModule,
    ProductosModule
  ]
})
export class SeedModule {}
