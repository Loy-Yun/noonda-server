import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger 세팅파일
 *
 * @param {INestApplication} app
 */
export function SwaggerSetup(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Noonda API Docs')
    .setDescription('DDD 7기 I4E1 팀 프로젝트 api 문서')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
