import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerSetup } from './util/swagger';
import { HttpExceptionFilter } from "./util/http-exception.filter";
import { Callback, Context, Handler } from "aws-lambda";
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  SwaggerSetup(app);
  await app.listen(3000);

  if (process.env.NODE_ENV === 'develop' || process.env.NODE_ENV === 'production') {
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({app: expressApp});
  }
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

if (!(process.env.NODE_ENV === 'develop' || process.env.NODE_ENV === 'production)')) bootstrap();



