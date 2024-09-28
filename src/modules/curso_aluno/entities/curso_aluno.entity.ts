import { Aluno } from 'src/modules/aluno/entities/aluno.entity';
import { Curso } from 'src/modules/curso/entities/curso.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CursoAluno {
  @PrimaryGeneratedColumn()
  codigo: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.cursoAlunos)
  @JoinColumn({ name: 'codigo_aluno' }) 
  codigo_aluno: Aluno; 

  @ManyToOne(() => Curso, (curso) => curso.cursoAlunos)
  @JoinColumn({ name: 'codigo_curso' }) 
  codigo_curso: Curso; 
}
