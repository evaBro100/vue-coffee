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
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.findAll(searchTerm)
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug)
  }

  @Get('/relatuves/:id')
  findRelatives(@Param('id') id: string) {
    return this.productService.findRelatives(+id)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productService.findById(+id)
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
