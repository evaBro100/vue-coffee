import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(sortBy?: string, searchTerm?: string, userId?: number) {
    let sortField = 'title'
    let sortValue = 'asc'
    if (sortBy) {
      if (sortBy.includes('-')) {
        sortValue = 'desc'
        sortBy = sortBy.replace('-', '')
      }
      sortField = sortBy
    }

    const products: CreateProductDto[] = await this.prisma.product.findMany(
      searchTerm
        ? {
            where: {
              OR: [
                {
                  title: {
                    contains: searchTerm,
                    mode: 'insensitive'
                  }
                },
                {
                  description: {
                    contains: searchTerm,
                    mode: 'insensitive'
                  }
                }
              ]
            },
            orderBy: {
              [sortField]: sortValue // Замените на 'desc', если нужна сортировка по убыванию
            }
          }
        : undefined
    )

    if (!products) throw new NotFoundException('Product not found')

    if (!userId) return products

    // Получаем список избранных товаров для данного пользователя
    const favorites = await this.prisma.favorite.findMany({
      where: {
        userId: +userId
      },
      select: {
        productId: true
      }
    })

    // Преобразуем список избранных товаров в множество для быстрого поиска
    const favoriteProductIds = new Set(
      favorites.map(favorite => favorite.productId)
    )

    // Добавляем поле isFavorite к каждому товару
    products.forEach(product => {
      product.isFavorite = favoriteProductIds.has(product.id)
    })
    return products
    // if (!productsWithFavorites) throw new NotFoundException('Product not found')

    // return productsWithFavorites
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
