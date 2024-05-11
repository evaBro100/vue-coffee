import { Module } from '@nestjs/common'
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, ReviewModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
