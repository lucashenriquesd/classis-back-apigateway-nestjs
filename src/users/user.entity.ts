import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;
}
