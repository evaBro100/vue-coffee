import { Module } from '@nestjs/common'
import { OrdersService } from './order.service'
import { OrdersController } from './order.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService]
})
export class OrderModule {}