import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.newcat(createCategoriaDto);
  }

  @Get()
  showAllCats() {
    return this.categoriasService.showAllCats();
  }

  @Get(':id_categoria')
  detalle1cat(@Param('id_categoria') id_categoria: number) {
    return this.categoriasService.detalle1cat(id_categoria);
  }

  @Patch(':id_categoria')
  updateCat(@Param('id_categoria',ParseIntPipe) id_categoria: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.updateCat(id_categoria, updateCategoriaDto);
  }

  @Delete(':id_categoria')
  delete1Cat(@Param('id_categoria') id_categoria: number) {
    return this.categoriasService.delete1Cat(id_categoria);
  }
}
