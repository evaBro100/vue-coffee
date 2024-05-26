import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { type Response } from 'express'
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

  async authenticateTelegram(
    telegramData: any,
    response: Response
  ): Promise<any> {
    // Получаем идентификатор Telegram пользователя
    const telegramId = telegramData.id

    // Поиск пользователя в базе данных по идентификатору Telegram
    let user = await this.prisma.user.findUnique({ where: { telegramId } })

    // const role = await this.prisma.role.findUnique({
    //   where: { name: ROLES.USER }
    // })

    // Если пользователь не найден, создаем новую запись
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          telegramId,
          firstName: telegramData.first_name,
          lastName: telegramData.last_name,
          username: telegramData.username
        }
      })
    }

    // Устанавливаем куки с данными пользователя
    const userData = {
      id: user.telegramId,
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName
    }
    response.cookie('tg_user', JSON.stringify(userData), {
      httpOnly: true
      // sameSite: 'lax'
      // secure: true // Используйте это только в случае, если у вас HTTPS
    })
    return user
  }

  async logout(response: Response): Promise<void> {
    // Удаляем cookie с информацией о пользователе
    response.clearCookie('tg_user')
    response.cookie('stel_token', '', {
      // httpOnly: true,
      secure: true, // Используйте это только в случае, если у вас HTTPS
      sameSite: 'none',
      path: '/', // Убедитесь, что путь правильный
      domain: 'oauth.telegram.org' // Замените на ваш домен
    })
    // response.clearCookie('stel_token')
    // response.clearCookie('stel_ssid')
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
