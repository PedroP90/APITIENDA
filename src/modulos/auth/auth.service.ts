import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Repository } from 'typeorm';
import { UsuarioRepository } from '../usuarios/entities/usuario.repository';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService
    ){}

  async login(loginDto: LoginAuthDto){
    const usuario = await this.usuarioRepository.findByEmail(loginDto.email);
    if (!usuario){
      throw new NotFoundException('Usuario no existe')
    }
    let isValidPassword;
    try {
      isValidPassword = await this.isMatch(loginDto.password, usuario.password)
      console.log(loginDto.password,usuario.password, isValidPassword)

    }catch(error){
      throw new InternalServerErrorException('Error validar password')
    }
    if (isValidPassword){
      //return 'Login success'
      return {
        msg: 'Usuario validado',
        status: 200,
        user: usuario,
        token: this.getAccessToken(usuario)
      }
      //return this.getAccessToken(usuario);
    }else{
      return 'Login not success'
    }
  }

  private getAccessToken(usuario: Usuario){
  
    try{
      //Crea el token con los campos del usuario seleccionados
      const accessToken = this.jwtService.sign({
        id: usuario.id,
        name: usuario.username,
        email: usuario.email,
        //rol: usuario.roles[0],
        //create: usuario.createdAt
      });
      return accessToken
    }catch(error){
      console.log(error);
      throw new InternalServerErrorException('Error al crear el token')
    }
  }

  async register(registerDto: RegisterAuthDto) {
    console.log(registerDto)
    // REGLAS DE NEGOCIO AL SERVICIO, FUNCIONALIDAD AL REPOSITORIO
    // const { username, email, password } = registerDto;
    //const { email, ...resto } = registerDto; Son ejemplos de como extraer los campos necesarios sin luego usar el nombre completo 
    // abajo usamos registerDto.email pero si usamos una de éstas fórmmulas podemos usar los campos

    if (await this.usuarioRepository.findByEmail(registerDto.email)){
      throw new BadRequestException('El email no existe en la Base de Datos')
    }

    if (await this.usuarioRepository.findByUsername(registerDto.username)){
      throw new BadRequestException('El username no existe en la Base de Datos')
    }

    console.log('el email', registerDto.email, ' no existe en la BD')
    try{
      registerDto.password = await this.getHash(registerDto.password);
      return this.usuarioRepository.save(registerDto);
    }catch(error){
      throw new InternalServerErrorException('Error al crear el registro')
    }

  }

  //funcion para encriptar la contraseña
  async getHash (password: string){
    return await bcrypt.hash(password, 10);
  }
 
  //funcion para comparar la contraseña en texto plano y la contraseña encriptada
  async isMatch (password: string, hash: string){
    return await bcrypt.compare(password, hash)
  }
  

}
