import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { UsuarioRepository } from './entities/usuario.repository';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
  imports: [ 
    ClientesModule,
    TypeOrmModule.forFeature([Usuario, UsuarioRepository])
  ],
  exports: [ UsuariosService, TypeOrmModule]
})
export class UsuariosModule {}
