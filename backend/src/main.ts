import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  // Enable CORS with more permissive settings for development
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  const port = 5000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`API endpoints are available at: http://localhost:${port}/api`);
}
bootstrap(); 