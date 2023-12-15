import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { CategoriasService } from '../categorias/categorias.service';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';
import * as categoriasIniciales from '../seed/datos/categorias.json'
@Injectable()
export class SeedService {
  constructor(
    private readonly categoriasService:CategoriasService,
  ){}

  public async cargaMasiva(){
    this.categoriasService.deleteAllCat()
    await this.insertNewCats()
  }
  private async insertNewCats(){
    await this.categoriasService.deleteAllCat()
    const PromesaInsertCats=[]
    const seedCats=categoriasIniciales
    seedCats.forEach(async(categoria:CreateCategoriaDto)=>{
      PromesaInsertCats.push(this.categoriasService.newcat(categoria))
    })
    const resultado = await Promise.all(PromesaInsertCats)
    // falta un return
  }
}
