import { Aluno } from 'src/modules/aluno/entities/aluno.entity';
import { Curso } from 'src/modules/curso/entities/curso.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CursoAluno {
  @PrimaryGeneratedColumn()
  codigo: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.cursoAlunos)
  codigo_aluno: Aluno; 

  @ManyToOne(() => Curso, (curso) => curso.cursoAlunos)
  codigo_curso: Curso; 
}
