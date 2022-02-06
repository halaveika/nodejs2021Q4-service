import { NestFactory } from '@nestjs/core';
import {
  INestApplication,
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import multipart from 'fastify-multipart';
import fastifySwagger from 'fastify-swagger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  let app: INestApplication | NestFastifyApplication;
  if (process.env.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    (app as NestFastifyApplication).register(multipart);
    (app as NestFastifyApplication).register(fastifySwagger, {
      mode: 'static',
      exposeRoute: true,
      routePrefix: '/doc',
      specification: {
        path: path.join(__dirname, '../doc/api.yaml'),
        postProcessor(swaggerObject) {
          return swaggerObject;
        },
        baseDir: '/doc',
      },
    });
  } else {
    app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('Trello killer')
      .setDescription('Docment REST API')
      .setVersion('1.0.0')
      .addTag('halaveika')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/doc', app, document);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((err) => {
          return `[${err.property}]: ${Object.values(err.constraints).join(
            ', ',
          )}`;
        });
        return new BadRequestException(messages.join(' | '));
      },
      forbidUnknownValues: false,
    }),
  );

  await app.listen(PORT, process.env.BACKEND_HOST, () =>
    console.log(`Server started on port = ${PORT}`),
  );
}
bootstrap();
