import { Test, TestingModule } from '@nestjs/testing';
import { CursoAlunoService } from './curso_aluno.service';

describe('CursoAlunoService', () => {
  let service: CursoAlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CursoAlunoService],
    }).compile();

    service = module.get<CursoAlunoService>(CursoAlunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
