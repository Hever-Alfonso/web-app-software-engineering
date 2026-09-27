import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // Create the application instance from the root module
  const app = await NestFactory.create(AppModule);
  // Read allowed origins from CORS_ORIGIN (comma-separated) and trim spaces
  const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((s) => s.trim());
  // Allow requests from those origins, or from the local defaults if not set
  app.enableCors({
    origin: corsOrigins?.length
      ? corsOrigins
      : ['http://localhost:5173', 'http://localhost', 'http://127.0.0.1'],
  });
  // Prefix every route with "api" (e.g. /api, /api/books)
  app.setGlobalPrefix('api');
  // Start the HTTP server on the port from the environment, or 3000
  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
