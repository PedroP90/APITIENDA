import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from 'src/modulos/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/modulos/usuarios/entities/usuario.repository';

//Le pasamos la estrategia Straegy definida en passport-jwt
//contiene las operaciones para desencriptar el token jwt y extraer la info
@Injectable()
export class JwtStragey extends PassportStrategy(Strategy){
    constructor(
        // private usuarioRepository: UsuarioRepository,
        private readonly configService: ConfigService
    ){
        //configuraciones
        //super es obligado por usar PassportStrategy
        //obtiene el token jwt de la Request
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //en false rechaza que acepte tokens caducados
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }
    
    //
    async validate(payload: Usuario){
        console.log(payload)
        return {
            id: payload.id,
            name: payload.username,
            email: payload.email
        }
    }
}
