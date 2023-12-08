import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  newProv(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.newProv(createProductoDto);
  }

  @Get()
  showAllProds() {
    return this.productosService.showAllProds();
  }

  @Get(':id_producto')
  detalle1prov(@Param('id_producto',ParseIntPipe) id_producto: number) {
    return this.productosService.detalle1prov(id_producto);
  }

  @Patch(':id_producto')
  update(@Param('id_producto',ParseIntPipe) id_producto: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.updateProv(id_producto, updateProductoDto);
  }

  @Delete(':id_producto')
  remove(@Param('id_producto',ParseIntPipe) id_producto: number) {
    return this.productosService.delete1Proc(id_producto);
  }
}