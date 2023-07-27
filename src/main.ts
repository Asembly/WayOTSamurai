import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT;

  const { schema } = app.get(GraphQLSchemaHost);

  await app.listen(port || 3000);

  console.log(`Server started: ${await app.getUrl()}`)
}
bootstrap();
