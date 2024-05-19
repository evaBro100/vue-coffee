// favorite.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AddFavoriteDto, RemoveFavoriteDto } from './dto/favorite.dto'

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async addToFavorites(data: AddFavoriteDto): Promise<void> {
    await this.prisma.favorite.create({
      data: {
        userId: data.userId,
        productId: data.productId
      }
    })
  }

  async removeFromFavorites(data: RemoveFavoriteDto): Promise<void> {
    await this.prisma.favorite.deleteMany({
      where: {
        userId: data.userId,
        productId: data.productId
      }
    })
  }

  async getUserFavorites(userId: number): Promise<any[]> {
    return this.prisma.favorite.findMany({
      where: {
        userId
      },
      include: {
        product: true
      }
    })
  }
}
