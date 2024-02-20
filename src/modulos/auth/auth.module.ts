import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuarioRepository } from '../usuarios/entities/usuario.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStragey } from './strategies/jwt-stragey/jwt-stragey';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsuarioRepository, JwtStragey, ConfigService],
   imports: [ 
      UsuariosModule,
      TypeOrmModule.forFeature([UsuarioRepository]),
      PassportModule.register({ defaultStrategy:'jwt'}),
      ConfigModule,
      //Configuramos el JWT
      // JwtModule.register({
      //   secret: 'claveSecreta123',
      //   signOptions:{
      //     expiresIn: '1h',
      //     algorithm: 'HS256'
      //   }
      // })
      //Debido a que debemos esperar a leer el fichero .env
      JwtModule.registerAsync({
        imports:[ ConfigModule ],
        inject:[ ConfigService ],
        useFactory: ( configService: ConfigService) => {
          return {
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: '2h',
              algorithm: 'HS256'
            }
          }
        }
      })
   ],
  exports: [ TypeOrmModule, AuthService, ConfigService]
  
})
export class AuthModule {}
