import { Controller, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async telegramAuth(@Req() req: Request) {
    // Обработка данных от Telegram
    const telegramData = req.body
    // Вызов сервиса для аутентификации и создания сеанса пользователя
    const user = await this.authService.authenticateTelegram(telegramData)
    // Возвращаем результат обработки
    return user
  }
}
