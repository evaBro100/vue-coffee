import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Post, Body, Req } from '@nestjs/common'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  telegramAuth(@Req() req: Request) {
    // Обработка данных от Telegram
    const telegramData = req.body
    // Вызов сервиса для аутентификации и создания сеанса пользователя
    // Возвращаем результат обработки

    return this.authService.authenticateTelegram(telegramData)
  }

  // @Post('create-admin')
  // async createAdmin(
  //   @Body('firstName') firstName: string,
  //   @Body('lastName') lastName: string
  // ) {
  //   return this.authService.createAdmin(firstName, lastName)
  // }
}
