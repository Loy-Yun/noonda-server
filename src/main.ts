import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './util/swagger';
import { HttpExceptionFilter } from "./util/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerSetup(app);
  await app.listen(3000);
}
bootstrap();
