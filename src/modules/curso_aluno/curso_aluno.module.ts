import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoAlunoController } from './curso_aluno.controller';
import { CursoAlunoService } from './curso_aluno.service';
import { CursoAluno } from './entities/curso_aluno.entity';
import { Curso } from '../curso/entities/curso.entity';
import { Aluno } from '../aluno/entities/aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CursoAluno, Curso, Aluno]), 
  ],
  controllers: [CursoAlunoController],
  providers: [CursoAlunoService],
  exports: [CursoAlunoService], 
})
export class CursoAlunoModule {}
