import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    CategoriasModule
  ]
})
export class SeedModule {}
