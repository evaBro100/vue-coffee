import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { type Response } from 'express'
import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  // @Post('login')
  async login(@Body() telegramData: any, @Res() response: Response) {
    const user = await this.authService.authenticateTelegram(
      telegramData,
      response
    )
    response.send(user)
  }

  @Get('logout')
  async logout(@Res() response: Response) {
    await this.authService.logout(response)
    response.send({ message: 'Logged out successfully' })
  }

  // @Post('create-admin')
  // async createAdmin(
  //   @Body('firstName') firstName: string,
  //   @Body('lastName') lastName: string
  // ) {
  //   return this.authService.createAdmin(firstName, lastName)
  // }
}
