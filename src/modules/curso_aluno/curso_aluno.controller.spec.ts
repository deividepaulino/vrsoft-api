import { Test, TestingModule } from '@nestjs/testing';
import { CursoAlunoController } from './curso_aluno.controller';
import { CursoAlunoService } from './curso_aluno.service';

describe('CursoAlunoController', () => {
  let controller: CursoAlunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CursoAlunoController],
      providers: [CursoAlunoService],
    }).compile();

    controller = module.get<CursoAlunoController>(CursoAlunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
