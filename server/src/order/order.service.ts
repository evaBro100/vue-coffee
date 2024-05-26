import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, items } = createOrderDto
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )

    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        status: 'pending',
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    })

    return order
  }
}
