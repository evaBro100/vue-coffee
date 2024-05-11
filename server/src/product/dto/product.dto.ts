import { Decimal } from '@prisma/client/runtime/library'

export class CreateProductDto {
  readonly id: number
  readonly title: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly description?: string
  // readonly slug: string
  readonly price: Decimal
  isFavorite?: boolean
  readonly images: string[]
  // readonly reviews: Review[]
}
