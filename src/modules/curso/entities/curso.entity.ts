import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50 })
  descricao: string;

  @Column('text')
  ementa: string;
}
