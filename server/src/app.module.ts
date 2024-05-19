import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductModule, ReviewModule, AuthModule, OrderModule],
  controllers: [],
  providers: []
})
export class AppModule {}
