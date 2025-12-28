import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'; // Fix: Use default import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cookie Parser
  app.use(cookieParser());

  // Configure CORS to allow cookies from the frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Must match your frontend URL exactly
    credentials: true,               // Required for cookies to be sent/received
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();