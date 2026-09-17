import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // Create the application instance from the root module
  const app = await NestFactory.create(AppModule);
  // Allow requests from the Vue frontend running on port 5173
  app.enableCors({
    origin: 'http://localhost:5173',
  });
  // Prefix every route with "api" (e.g. /api, /api/books)
  app.setGlobalPrefix('api');
  // Start the HTTP server on the port from the environment, or 3000
  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();