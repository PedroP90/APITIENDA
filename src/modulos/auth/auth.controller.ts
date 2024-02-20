import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { register } from 'module';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //login
  //@body coge toda la info del registro y la pasa por el dto
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto){
    console.log(loginAuthDto)
    return this.authService.login(loginAuthDto);
  }

  //register
  @Post('register') 
  register(@Body()registerdto: RegisterAuthDto){
    console.log(registerdto)
    return this.authService.register(registerdto);
  }

  //logout

  //checkToken

  //perfil
}
