import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(searchTerm?: string, userId?: number) {
    // const productsWithFavorites = await this.prisma
    //   .$queryRaw`SELECT p.*, CASE WHEN f."userId" IS NULL THEN false ELSE true END AS "isFavorite"
    //   FROM "Product" p
    //   LEFT JOIN "Favorite" f ON p.id = f."productId" AND f."userId" = ${userId}
    // `

    // const product = await this.prisma.product.findMany(
    //   searchTerm
    //     ? {
    //         where: {
    //           OR: [
    //             { title: { contains: searchTerm } },
    //             { description: { contains: searchTerm } }
    //           ]
    //         }
    //       }
    //     : undefined
    // )

    const productsWithFavorites: any[] = await this.prisma.$queryRaw`
    SELECT p.*, CASE WHEN f."user_id" IS NULL THEN false ELSE true END AS "isFavorite"
    FROM "Product" p
    LEFT JOIN "Favorite" f ON p.id = f."product_id" AND f."user_id" = ${userId}`

    // Запрос для фильтрации продуктов по поисковому запросу
    const products = await this.prisma.product.findMany({
      where: searchTerm
        ? {
            OR: [
              { title: { contains: searchTerm } },
              { description: { contains: searchTerm } }
            ]
          }
        : undefined
    })

    // Если не найдены продукты, выкинуть ошибку
    if (products.length === 0) {
      throw new NotFoundException('Product not found')
    }

    // Возвращаем результат объединения продуктов и флагов isFavorite
    return products.map(product => {
      const favoriteInfo = productsWithFavorites.find(p => p.id === product.id)
      return {
        ...product,
        isFavorite: favoriteInfo ? favoriteInfo.isFavorite : false
      }
    })

    if (!productsWithFavorites) throw new NotFoundException('Product not found')

    return productsWithFavorites
  }

  async findById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } })

    if (!product) throw new NotFoundException('Product not found')

    return product
  }

  // async findBySlug(slug: string) {
  //   const product = await this.prisma.product.findUnique({ where: { slug } })

  //   if (!product) throw new NotFoundException('Product not found')

  //   return product
  // }

  async findRelatives(currentProductId: number) {
    return await this.prisma.product.findMany({
      where: {
        id: {
          not: currentProductId
        }
      }
    })
  }

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: createProductDto })
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} product`
  // }
}
