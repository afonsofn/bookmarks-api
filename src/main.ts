import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To the Validations Pipes works in the typescript intefaces/types files we need to declare it here
  app.useGlobalPipes(
    new ValidationPipe({
      // The 'whitelist' property in ValidationPipe filters out elements not explicitly declared in our classes.
      whitelist: true,
    }),
  );

  await app.listen(3333);
}

bootstrap();
