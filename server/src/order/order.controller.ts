import { Controller, Post, Body } from '@nestjs/common'
import { OrdersService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto)
  }
}
