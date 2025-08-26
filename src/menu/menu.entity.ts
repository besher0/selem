/* eslint-disable prettier/prettier */
import { Type } from 'src/types/type.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  description1: string;

  @Column({ type: 'text', nullable: true })
  description2: string;
  
  @ManyToOne(() => Type, (type) => type.menus, { onDelete: 'CASCADE', nullable: false  })
  @JoinColumn({ name: 'type_id' })
  type: Type;
}
