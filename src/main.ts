import { NestFactory} from '@nestjs/core';
import { ValidationPipe,ValidationError, BadRequestException} from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true,
    exceptionFactory: (errors: ValidationError[]) => {
      let messages = errors.map(err => {
        return `[${err.property}]: ${Object.values(err.constraints).join(', ')}`
    });
      return new BadRequestException(messages.join(' | '));
    },
    forbidUnknownValues: false,
  }));
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();
