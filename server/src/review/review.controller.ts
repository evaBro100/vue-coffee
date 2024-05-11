import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  findAll() {
    return this.reviewService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.reviewService.findById(+id)
  }
}
