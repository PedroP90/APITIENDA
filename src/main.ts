import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//el api de setglobalprefix puede ser cualquier nombre, es para dirigir las peticiones de BACK-END

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //--prefijo de acceso a la api en url ---
  app.setGlobalPrefix('tienda');
  
  //--configuración mecanismo de validación ---- yarn add --save class-validator class-transformer 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  //---puerto de escucha del servidor
  await app.listen(3000);
}
bootstrap();