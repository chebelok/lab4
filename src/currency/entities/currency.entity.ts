import { Record } from '../../record/entities/record.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  code: string;

  @OneToMany(() => User, (user) => user.defaultCurrency)
  user: User[];

  @OneToMany(() => Record, (record) => record.currency)
  records: Record[];
}
