import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
