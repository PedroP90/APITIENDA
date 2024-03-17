import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsupaginationDTO } from './dto/usupagination.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // @Post('/')
  // create(@Body() createUsuarioDto: CreateUsuarioDto) {
  //   console.log('usuario creado')
  //   return this.usuariosService.create(createUsuarioDto);
  // }

  // @Get('listar')
  //   getall( @Query() usupaginationDTO: UsupaginationDTO ) {
  //       console.log(usupaginationDTO)
  //       return this.usuariosService.findAll(usupaginationDTO)
  //   }

  // @Get(':nombreUsuario')
  // findOne(@Param('nombreUsuario') nombreUsuario: string) {
  //   return this.usuariosService.findOne(nombreUsuario);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  //   return this.usuariosService.update(+id, updateUsuarioDto);
  // }

  // @Delete(':nombreUsuario')
  // remove(@Param('nombreUsuario') nombreUsuario: string) {
  //   return this.usuariosService.remove(nombreUsuario);
  // }
  @Post()
  create(@Body() createUserDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
  
}
