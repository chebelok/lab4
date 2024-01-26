import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { Currency } from '../../currency/entities/currency.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => Currency, (currency) => currency.records, { nullable: true })
  @JoinColumn({ name: 'currencyId', referencedColumnName: 'id' })
  currency?: Currency;

  @ManyToOne(() => Category, (category) => category.records)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}
