import { CursoAluno } from 'src/modules/curso_aluno/entities/curso_aluno.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 50 })
  nome: string;

  @OneToMany(() => CursoAluno, (cursoAluno) => cursoAluno.codigo_aluno)
  cursoAlunos: CursoAluno[];
}
