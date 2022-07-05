import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Sometime after NestFactory add this to add HTTP Basic Auth
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        yourUserName: 'p4ssw0rd',
      },
    }),
  );

  // VALIDATION
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // SWAGGER
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cool')
    .setDescription('API Requests Description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/documentation', app, document);

  // CORS
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
