import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ClientesModule } from '../clientes/clientes.module';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [ 
    ClientesModule,
    TypeOrmModule.forFeature([Usuario])
  ],
  exports: [ UsuariosService, TypeOrmModule]
})
export class UsuariosModule {}
