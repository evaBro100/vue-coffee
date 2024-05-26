// dto/create-order.dto.ts
export class CreateOrderDto {
  userId: number
  items: CreateOrderItemDto[]
}

// dto/create-order-item.dto.ts
export class CreateOrderItemDto {
  productId: number
  quantity: number
  price: number
}
