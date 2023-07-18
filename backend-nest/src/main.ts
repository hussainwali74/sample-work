import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  // --------------------------------------------------------------------------- SwaggerDocs
  // swaggerUI
  const options = new DocumentBuilder()
    .setTitle('hussain')
    .setDescription('documentation of api')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'bearer' },
      'token',
    )
    // .addServer('http://54.187.17.134:5050')
    .addServer('http://localhost:' + process.env.PORT)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  const options2 = {
    // customCss: '.swagger-ui .topbar { display: none }'
    customCss: `
      .topbar-wrapper img {content:'hussain'; width:300px; height:auto;}
      .swagger-ui .topbar { background-color: white; }
      ..renderedMarkdown {
        color: #26eee7;
      }
      .swagger-ui .model .property.primitive {
          color: #b02323;
      }
          `,
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: ' API Docs',
  };

  SwaggerModule.setup('docs', app, document, options2);
  // --------------------------------------------------------------------------- SwaggerDocs end
  await app.listen(process.env.PORT);
}
bootstrap();
