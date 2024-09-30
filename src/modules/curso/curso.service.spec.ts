import { Test, TestingModule } from '@nestjs/testing';
import { CursoService } from './curso.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Curso } from './entities/curso.entity';
import { CursoAluno } from '../curso_aluno/entities/curso_aluno.entity'; 

const mockCursoRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const mockCursoAlunoRepository = {
  count: jest.fn(),
};

describe('Serviço de cursos', () => {
  let service: CursoService;
  let cursoRepository: jest.Mocked<Repository<Curso>>;
  let cursoAlunoRepository: jest.Mocked<Repository<CursoAluno>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CursoService,
        { provide: getRepositoryToken(Curso), useValue: mockCursoRepository },
        { provide: getRepositoryToken(CursoAluno), useValue: mockCursoAlunoRepository },
      ],
    }).compile();

    service = module.get<CursoService>(CursoService);
    cursoRepository = module.get<jest.Mocked<Repository<Curso>>>(getRepositoryToken(Curso));
    cursoAlunoRepository = module.get<jest.Mocked<Repository<CursoAluno>>>(getRepositoryToken(CursoAluno));
  });

  it('Criado mock do serviço', () => {
    expect(service).toBeDefined();
  });

  describe('CREATE', () => {
    it('Criar um novo curso no app', async () => {
      const createCursoDto = { codigo: 1, descricao: 'Curso de Teste', ementa: 'Ementa do curso' }; 
      const createdCurso = { codigo: 1, descricao: 'Curso de Teste', ementa: 'Ementa do curso', cursoAlunos: [] }; 

      cursoRepository.create.mockReturnValue(createdCurso);
      cursoRepository.save.mockResolvedValue(createdCurso);

      const result = await service.create(createCursoDto);
      expect(cursoRepository.create).toHaveBeenCalledWith(createCursoDto);
      expect(cursoRepository.save).toHaveBeenCalledWith(createdCurso);
      expect(result).toEqual(createdCurso);
    });
  });

  describe('BUSCAR CURSOS', () => {
    it('retorna a lista de cursos cadastrados', async () => {
      const cursos = [
        { codigo: 1, descricao: 'Curso 1', ementa: 'Ementa 1', cursoAlunos: [] }, 
        { codigo: 2, descricao: 'Curso 2', ementa: 'Ementa 2', cursoAlunos: [] },
      ];
      cursoRepository.find.mockResolvedValue(cursos);

      const result = await service.findAll();
      expect(cursoRepository.find).toHaveBeenCalled();
      expect(result).toEqual(cursos);
    });
  });

  describe('Buscar por id', () => {
    it('Retorna 1 único curso pelo seu ID', async () => {
      const curso = { codigo: 1, descricao: 'Curso 1', ementa: 'Ementa 1', cursoAlunos: [] }; 
      cursoRepository.findOne.mockResolvedValue(curso);

      const result = await service.findOne(1);
      expect(cursoRepository.findOne).toHaveBeenCalledWith({ where: { codigo: 1 } });
      expect(result).toEqual(curso);
    });
  });

  describe('Atualizar curso', () => {
    it('Atualiza um curso e retorna as informações', async () => {
      const curso = { 
          codigo: 1, 
          descricao: 'Curso 1', 
          ementa: 'Ementa 1', 
          cursoAlunos: [] 
      };
      const updateCursoDto = { 
          descricao: 'Curso Atualizado', 
          ementa: 'Ementa Atualizada' 
      };

      cursoRepository.findOne.mockResolvedValue(curso);
      cursoRepository.save.mockResolvedValue({ ...curso, ...updateCursoDto });

      const result = await service.update(1, updateCursoDto);
      expect(cursoRepository.findOne).toHaveBeenCalledWith({ where: { codigo: 1 } });
      expect(cursoRepository.save).toHaveBeenCalledWith({ ...curso, ...updateCursoDto });
      expect(result).toEqual({ ...curso, ...updateCursoDto });
    });

    it('Se o curso não existe retorna erro', async () => {
      cursoRepository.findOne.mockResolvedValue(null);
      
      await expect(service.update(1, { descricao: 'Curso Atualizado' })).rejects.toThrow(NotFoundException);
    });
  });



});
