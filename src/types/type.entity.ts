/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Menu } from '../menu/menu.entity';

@Entity('types')
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  description1: string;

  @Column({ type: 'text', nullable: true })
  description2: string;

  // العلاقة مع الـ Menu (واحد إلى متعدد)
  @OneToMany(() => Menu, (menu) => menu.type)
  menus: Menu[];
}
