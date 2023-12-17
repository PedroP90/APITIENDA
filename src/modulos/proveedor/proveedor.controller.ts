import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedorService.newProv(createProveedorDto);
  }

  @Get()
  showAllProvs() {
    return this.proveedorService.showAllProvs();
  }

  @Get(':id_proveedor')
  detalle1Prov(@Param('id_proveedor') id_proveedor: string) {
    return this.proveedorService.detalle1Prov(id_proveedor);
  }

  @Patch(':id_proveedor')
  update(@Param('id_proveedor') id_proveedor: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    return this.proveedorService.updateProv(id_proveedor, updateProveedorDto);
  }

  @Delete(':id_proveedor')
  remove(@Param('id_proveedor') id_proveedor: string) {
    return this.proveedorService.delete1cat(id_proveedor);
  }
}
