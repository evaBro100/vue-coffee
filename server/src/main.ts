import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule
} from '@nestjs/swagger'

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
  const config = new DocumentBuilder()
    .setTitle('Myshatte')
    .setVersion('1.0')
    .build()
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      controllerKey
  }
  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)
  await app.listen(4200)
}
bootstrap()
