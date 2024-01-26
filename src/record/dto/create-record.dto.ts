import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

export class CreateRecordDto {
  @IsString()
  userId: User['id'];

  @IsNumber()
  amount: number;

  @IsString()
  categoryId: Category['id'];

  @IsString()
  @IsOptional()
  currencyCode?: string;
}
