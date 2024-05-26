// favorite.controller.ts
import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { FavoriteService } from './favorite.service'
import { AddFavoriteDto, RemoveFavoriteDto } from './dto/favorite.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('favorites')
@ApiTags('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  async addToFavorites(@Body() data: AddFavoriteDto): Promise<void> {
    return this.favoriteService.addToFavorites(data)
  }

  @Delete(':userId/:productId')
  async removeFromFavorites(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number
  ): Promise<void> {
    return this.favoriteService.removeFromFavorites({ userId, productId })
  }

  @Get(':userId')
  async getUserFavorites(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<any[]> {
    return this.favoriteService.getUserFavorites(userId)
  }
}
