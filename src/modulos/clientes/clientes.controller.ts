import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post('/')
  create(@Body() createClienteDto: CreateClienteDto) {
    // console.log('usuario creado')
    return this.clientesService.create(createClienteDto);
  }

  @Get('listar')
  findAll( @Query() paginationDto: PaginationDTO ) {
    console.log(paginationDto)
    return this.clientesService.findAll()
}

  @Get(':nif')
  findOne(@Param('nif') nif: string) {
    return this.clientesService.findOne(nif);
  }

  @Patch(':nif')
  update(@Param('nif') nif: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(nif, updateClienteDto);
  }

  @Delete(':nif')
    remove(@Param('nif') nif: string) {
        return this.clientesService.remove(nif);
    }
}
