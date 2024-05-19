import { Prisma, PrismaClient } from '@prisma/client'
import * as faker from '@faker-js/faker'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

const fakerProduct = (): Prisma.ProductCreateInput => ({
  title: faker.fakerRU.commerce.productName(),
  price: faker.fakerRU.commerce.price()
})

async function main() {
  const fakerRounds = 10
  dotenv.config()
  console.log('seeding')

  for (let i = 0; i < fakerRounds; i++) {
    await prisma.product.create({
      data: fakerProduct()
    })
  }
  // await prisma.role.createMany({
  //   data: [{ name: 'user' }, { name: 'admin' }],
  //   skipDuplicates: true // Ignorировать дубликаты, если роли уже созданы
  // })
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
