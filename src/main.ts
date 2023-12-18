import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  );

  const config = new DocumentBuilder()
    .setTitle('Métodos de la api tienda')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('Tienda')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('tienda', app, document);

  
  //---puerto de escucha del servidor
  await app.listen(3000);
}
bootstrap();