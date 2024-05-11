import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

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
    // Если пользователь не найден, создаем новую запись
    return await this.prisma.user.create({
      data: {
        telegramId,
        firstName: telegramData.first_name,
        lastName: telegramData.last_name,
        username: telegramData.username
      }
    })
  }
}
