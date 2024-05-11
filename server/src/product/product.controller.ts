import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { CreateProductDto } from './dto/product.dto'

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiQuery({ name: 'searchTerm', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @Get()
  findAll(
    @Query('sortBy')
    sortBy?: string,
    @Query('searchTerm')
    searchTerm?: string,
    @Query('userId')
    userId?: number
  ) {
    return this.productService.findAll(sortBy, searchTerm, userId)
  }

  // @Get('/slug/:slug')
  // findBySlug(@Param('slug') slug: string) {
  //   return this.productService.findBySlug(slug)
  // }

  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.productService.findRelatives(+id)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id)
  }

  @Post()
  @ApiBody({
    type: CreateProductDto,
    description: 'Json structure for user object'
  })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productService.create(createProductDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
