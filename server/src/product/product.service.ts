import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(searchTerm?: string) {
    const product = await this.prisma.product.findMany(
      searchTerm
        ? {
            where: {
              OR: [
                { name: { contains: searchTerm } },
                { description: { contains: searchTerm } }
              ]
            }
          }
        : undefined
    )

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  async findRelatives(currentProductId: number) {
    return await this.prisma.product.findMany({
      where: {
        id: {
          not: currentProductId
        }
      }
    })
  }
  // create(id: number, createProductDto: CreateProductDto) {
  //   return 'This action adds a new product'
  // }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`
  // }
}
