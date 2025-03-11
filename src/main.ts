import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Configuração básica do Swagger
  const config = new DocumentBuilder()
  .setTitle('Minha API')
  .setDescription('Documentação da API criada com NestJS')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'access-token', // Nome do esquema de autenticação
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Documentação da Minha API',
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
