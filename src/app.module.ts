import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { CategoriasModule } from './modulos/categorias/categorias.module';
import { ProveedorModule } from './modulos/proveedor/proveedor.module';


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
      // type: 'postgres',
      // host: "192.168.1.24",
      // port: 5432,
      // database: "postgres",
      // username: "postgres",
      // password: "pedro",
      // autoLoadEntities: true,
      // synchronize: true
    }),
    ClientesModule,
    UsuariosModule,
    ProductosModule,
    CategoriasModule,
    ProveedorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
