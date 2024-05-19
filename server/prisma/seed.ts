import { Prisma, PrismaClient } from '@prisma/client'
import * as faker from '@faker-js/faker'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

const fakerProduct = (idx: number): Prisma.ProductCreateInput => {
  const img = [
    '/coffe/americano.png',
    '/coffe/teagreen.png',
    '/coffe/cappuccino.png',
    '/coffe/cappuccinoCaramel.png',
    '/coffe/latte.png',
    '/coffe/latteCaramel.png',
    '/coffe/latteChocolate.png',
    '/coffe/flat.png',
    '/coffe/teaOrange.png',
    '/coffe/teaGrapefruit.png',
    '/coffe/tea.png',
    '/coffe/espresso.png'
  ]
  const titles = [
    'Американо',
    'Зеленый чай',
    'Капучино',
    'Капучино с карамелью',
    'Латте',
    'Латте с карамелью',
    'Латте с шоколадом',
    'Флэт Уайт',
    'Чай с апельсином',
    'Чай с грейпфрутом',
    'Черный чай',
    'Эспрессо'
  ]
  const prices = [250, 200, 250, 300, 250, 300, 300, 300, 250, 250, 200, 200]
  return {
    title: titles[idx],
    price: prices[idx],
    images: [img[idx]]
  }
}

async function main() {
  const fakerRounds = 10
  dotenv.config()
  console.log('seeding')

  for (let i = 0; i < fakerRounds; i++) {
    await prisma.product.create({
      data: fakerProduct(i)
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
