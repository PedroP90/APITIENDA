import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { SeedModule } from './modulos/seed/seed.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { CategoriasModule } from './modulos/categorias/categorias.module';
import { ProveedorModule } from './modulos/proveedor/proveedor.module';
import { AuthModule } from './modulos/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    SeedModule,
    ClientesModule,
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    ProveedorModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
