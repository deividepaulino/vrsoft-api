import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { Curso } from './entities/curso.entity';
import { CursoAlunoModule } from '../curso_aluno/curso_aluno.module';
import { Aluno } from '../aluno/entities/aluno.entity';
import { CursoAluno } from '../curso_aluno/entities/curso_aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso, Aluno, CursoAluno]),
    CursoAlunoModule, 
  ],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
