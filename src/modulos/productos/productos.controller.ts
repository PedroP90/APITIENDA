import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  //@UseGuards(AuthGuard('jwt'))
  newProd(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.newProd(createProductoDto);
  }

  @Get()
  showAllProds() {
    return this.productosService.showAllProds();
  }

  @Get(':id_producto')
  detalle1prov(@Param('id_producto') id_producto: string) {
    return this.productosService.detalle1prov(id_producto);
  }

  @Patch(':id_producto')
  update(@Param('id_producto',ParseIntPipe) id_producto: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id_producto, updateProductoDto);
  }

  @Delete(':id_producto')
  remove(@Param('id_producto') id_producto: string) {
    return this.productosService.delete1Proc(id_producto);
  }
}