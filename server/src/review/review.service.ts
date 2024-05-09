import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const review = await this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    })

    if (!review) throw new NotFoundException('Product not found')

    return review
  }

  async findById(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } })

    if (!review) throw new NotFoundException('Product not found')

    return review
  }
}
