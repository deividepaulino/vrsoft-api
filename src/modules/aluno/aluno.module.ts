import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { Aluno } from './entities/aluno.entity';
import { CursoAluno } from '../curso_aluno/entities/curso_aluno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno, CursoAluno],), 
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [AlunoService], 
})
export class AlunoModule {}
