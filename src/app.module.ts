import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoModule } from './modules/curso/curso.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { CursoAlunoModule } from './modules/curso_aluno/curso_aluno.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'postgres', 
      password: 'D31v1d3123',
      database: 'vrsoft', 
      autoLoadEntities: true,
      synchronize: true,
    }),
    CursoModule,
    AlunoModule,
    CursoAlunoModule,
  ],
})
export class AppModule {}
