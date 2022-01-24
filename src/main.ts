import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule,{cors:true});
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config= new DocumentBuilder()
  .setTitle('Api example')
  .setDescription('The example of description')
  .setVersion('1.0')
  .addTag('user_posts')
  .build()
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.port || 8080);
}
bootstrap();
