import { Injectable } from '@nestjs/common';
import { ClientesService } from '../clientes/clientes.service';
import { CreateClienteDto } from '../clientes/dto/create-cliente.dto';
import * as seedClientes from '../seed/datos/clientes.json'
import * as seedUsuarios from '../seed/datos/usuarios.json'
import * as categoriasIniciales from '../seed/datos/categorias.json'
import * as ProveedoresIniciales from '../seed/datos/proveedores.json'
import * as ProductosIniciales from '../seed/datos/productos.json'
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CategoriasService } from '../categorias/categorias.service';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';
import { ProveedorService } from '../proveedor/proveedor.service';
import { CreateProveedorDto } from '../proveedor/dto/create-proveedor.dto';
import { ProductosService } from '../productos/productos.service';
import { CreateProductoDto } from '../productos/dto/create-producto.dto';


@Injectable()
export class SeedService {

  constructor (
    private readonly clienteService: ClientesService,
    private readonly usuarioService: UsuariosService,
    private readonly categoriasService:CategoriasService,
    private readonly proveService:ProveedorService,
    private readonly procService:ProductosService
  ){}
  
  public async cargaMasiva(){

    // this.usuarioService.deleteAllUsuarios();
    this.procService.deleteAllProcs();
    this.clienteService.deleteAllClientes()
    this.categoriasService.deleteAllCat();
    this.proveService.deleteAllProv();
    await this.insertNewCats();
    await this.insertNewProvs();
    await this.insertNewClientes();
    await this.insertNewProcs();
    //await this.insertNewUsuarios();
    

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

  // private async insertNewUsuarios(){
  //   await this.usuarioService.deleteAllUsuarios();
  //   const insertPromisesUsuarios = [];
  //   seedUsuarios.forEach( (usuario: CreateUsuarioDto) => {
  //   insertPromisesUsuarios.push(this.usuarioService.create(usuario));
  //   })
  //   const results = await Promise.all(insertPromisesUsuarios);
  //   return true;
  // }

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

  private async insertNewProvs(){
    await this.proveService.deleteAllProv()
    const PromesaInsertProvs=[]
    ProveedoresIniciales.forEach((proveedor:CreateProveedorDto)=>{
      PromesaInsertProvs.push(this.proveService.newProv(proveedor))
    })
    const resultado = await Promise.all(PromesaInsertProvs)
    return true;
  }

  private async insertNewProcs(){
    await this.procService.deleteAllProcs()
    const PromesaInsertProvs=[]
    const seedProvs=ProductosIniciales
    seedProvs.forEach(async(producto:CreateProductoDto)=>{
      PromesaInsertProvs.push(this.procService.newProd(producto))
    })
    const resultado = await Promise.all(PromesaInsertProvs)
    return true;
  }

}
