import { Injectable } from '@nestjs/common';
import { ClientesService } from '../clientes/clientes.service';
import { CreateClienteDto } from '../clientes/dto/create-cliente.dto';
import * as seedClientes from '../seed/datos/clientes.json'
import * as seedUsuarios from '../seed/datos/usuarios.json'
import * as categoriasIniciales from '../seed/datos/categorias.json'
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CategoriasService } from '../categorias/categorias.service';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';


@Injectable()
export class SeedService {

  constructor (
    private readonly clienteService: ClientesService,
    private readonly usuarioService: UsuariosService,
    private readonly categoriasService:CategoriasService
    ){}
  
  public async cargaMasiva(){
    this.clienteService.deleteAllClientes();
    this.usuarioService.deleteAllUsuarios();
    this.categoriasService.deleteAllCat()
    await this.insertNewClientes();
    await this.insertNewUsuarios();
    await this.insertNewCats()
  }

  private async insertNewClientes(){
    await this.clienteService.deleteAllClientes();
    const insertPromisesClientes = [];
    seedClientes.forEach( (cliente: CreateClienteDto) => {
    insertPromisesClientes.push(this.clienteService.create(cliente));
    })
    const results = await Promise.all(insertPromisesClientes);
    return true;
  }

  private async insertNewUsuarios(){
    await this.usuarioService.deleteAllUsuarios();
    const insertPromisesUsuarios = [];
    seedUsuarios.forEach( (usuario: CreateUsuarioDto) => {
    insertPromisesUsuarios.push(this.usuarioService.create(usuario));
    })
    const results = await Promise.all(insertPromisesUsuarios);
    return true;
  }

  private async insertNewCats(){
    await this.categoriasService.deleteAllCat()
    const PromesaInsertCats=[]
    const seedCats=categoriasIniciales
    seedCats.forEach(async(categoria:CreateCategoriaDto)=>{
      PromesaInsertCats.push(this.categoriasService.newcat(categoria))
    })
    const resultado = await Promise.all(PromesaInsertCats)
    return true;
  }

}
