import { CursoAluno } from 'src/modules/curso_aluno/entities/curso_aluno.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ length: 100 })
  descricao: string;

  @Column({ type: 'text', nullable: true }) 
  ementa: string; 

  @OneToMany(() => CursoAluno, (cursoAluno) => cursoAluno.codigo_curso)
  cursoAlunos: CursoAluno[];
}
