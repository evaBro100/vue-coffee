import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [ProductModule, ReviewModule, AuthModule, OrderModule, FavoriteModule],
  controllers: [],
  providers: []
})
export class AppModule {}
