import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://example.com',
      'http://www.example.com',
      'http://app.example.com',
      'https://example.com',
      'http://10.8.0.67',
      'http://10.8.0.67:80'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  })
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.setGlobalPrefix('api')
  await app.listen(4200)
}
bootstrap()
