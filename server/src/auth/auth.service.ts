import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ROLES } from 'src/constants/roles'

interface TelegramUser {
  id: number
  username: string
  first_name: string
  last_name: string
  auth_date: number
  hash: string
  photo_url: string
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async authenticateTelegram(telegramData: any): Promise<any> {
    // Получаем идентификатор Telegram пользователя
    const telegramId = telegramData.id

    // Поиск пользователя в базе данных по идентификатору Telegram
    let user = await this.prisma.user.findUnique({ where: { telegramId } })

    if (user) return user

    // const role = await this.prisma.role.findUnique({
    //   where: { name: ROLES.USER }
    // })

    // Если пользователь не найден, создаем новую запись
    return await this.prisma.user.create({
      data: {
        telegramId,
        firstName: telegramData.first_name,
        lastName: telegramData.last_name,
        username: telegramData.username
        // roleId: role.id
      }
    })
  }

  // async createAdmin(firstName: string, lastName: string): Promise<any> {
  //   const role = await this.prisma.role.findUnique({
  //     where: { name: ROLES.ADMIN }
  //   })

  //   return await this.prisma.user.create({
  //     data: {
  //       firstName,
  //       lastName,
  //       roleId: role.id
  //     }
  //   })
  // }
}
