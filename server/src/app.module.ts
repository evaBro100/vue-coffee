import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ProductModule, ReviewModule],
  controllers: [],
  providers: []
})
export class AppModule {}
