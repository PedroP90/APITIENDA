import { Get, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ) { }

  // listar todas las categorias
  async showAllCats() {
    try {
      const catData = await this.categoriaRepository.find()
      return catData
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todas las categorias")
    }
  }

  // // detalles de una categoria
  // async detalle1cat(id_categoria: number) {
  //   try {
  //     const categoria = await this.categoriaRepository.findOne({
  //       where: { id_categoria }
  //     })
  //     return categoria
  //   } catch (error) {
  //     throw new InternalServerErrorException('fallo al detallar categoria')
  //   }
  // }

  detalle1cat(id_categoria: string) {
    const categoria = this.categoriaRepository.findOne({
      where:{
        id_categoria
      }
    });
    return categoria;
  }

  //crear categorias
  async newcat(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto)
      await this.categoriaRepository.save(categoria)
      return {
        message: `Categoria creada`,
        data: categoria,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('no se pudo crear la nueva categoria')
    }
  }

  

  // eliminar categorias
  async delete1Cat(id_categoria:string) {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id_categoria }
      })
      await this.categoriaRepository.remove(categoria);
      return {
        message: `Categoría con ID ${id_categoria} eliminada correctamente`,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException("fallo al eliminar categoria")
    }
  }

  async updateCat(id_categoria: string, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { id_categoria }
      })
      this.categoriaRepository.merge(categoria, updateCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return {
        message: `Categoría con ID ${id_categoria} actualizada correctamente`,
        data: categoria,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la categoría.');
    }
  }

 
  // eliminar cateogiras masivo
  async deleteAllCat(){
    const consulta=this.categoriaRepository.createQueryBuilder('categoria');
    try {
      return await consulta.delete().where({}).execute()
    } catch (error) {
    }
  }



}