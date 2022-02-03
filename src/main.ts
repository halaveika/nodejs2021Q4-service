import { NestFactory} from '@nestjs/core';
import { INestApplication, ValidationPipe,ValidationError, BadRequestException} from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';


async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app:INestApplication | NestFastifyApplication = (process.env.USE_FASTIFY === 'true') ? (await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter())) : (await NestFactory.create(AppModule));
  app.useGlobalPipes(new ValidationPipe({transform:true,
    exceptionFactory: (errors: ValidationError[]) => {
      let messages = errors.map(err => {
        return `[${err.property}]: ${Object.values(err.constraints).join(', ')}`
    });
      return new BadRequestException(messages.join(' | '));
    },
    forbidUnknownValues: false,
  }));

  await app.listen(PORT, process.env.BACKEND_HOST, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();
