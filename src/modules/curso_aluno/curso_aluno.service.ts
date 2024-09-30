import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CursoAluno } from './entities/curso_aluno.entity';
import { CreateCursoAlunoDto } from './dto/create-curso_aluno.dto';
import { UpdateCursoAlunoDto } from './dto/update-curso_aluno.dto';
import { Curso } from '../curso/entities/curso.entity';
import { Aluno } from '../aluno/entities/aluno.entity';

@Injectable()
export class CursoAlunoService {
  constructor(
    @InjectRepository(CursoAluno)
    private cursoAlunoRepository: Repository<CursoAluno>,
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  async create(createCursoAlunoDto: CreateCursoAlunoDto): Promise<CursoAluno> {
    const aluno = await this.alunoRepository.findOne({ where: { codigo: createCursoAlunoDto.codigo_aluno } });
    if (!aluno) {
      throw new NotFoundException(`Aluno com código ${createCursoAlunoDto.codigo_aluno} não encontrado.`);
    }

    const curso = await this.cursoRepository.findOne({ where: { codigo: createCursoAlunoDto.codigo_curso } });
    if (!curso) {
      throw new NotFoundException(`Curso com código ${createCursoAlunoDto.codigo_curso} não encontrado.`);
    }

    const cursoAluno = this.cursoAlunoRepository.create({
      codigo_aluno: aluno,
      codigo_curso: curso,
    });
    
    return this.cursoAlunoRepository.save(cursoAluno);
  }

  findAll(): Promise<CursoAluno[]> {
    return this.cursoAlunoRepository.find();
  }

  async findOne(codigo: number): Promise<CursoAluno> {
    const cursoAluno = await this.cursoAlunoRepository.findOne({ where: { codigo } });
    if (!cursoAluno) {
      throw new NotFoundException(`CursoAluno com código ${codigo} não encontrado.`);
    }
    return cursoAluno;
  }

async update(codigoAluno: number, updateCursoAlunoDto: UpdateCursoAlunoDto): Promise<CursoAluno> {
  let cursoAluno = await this.cursoAlunoRepository.findOne({
    where: {
      codigo_aluno: { codigo: codigoAluno }, 
    },
    relations: ['codigo_curso'], 
  });

  if (!cursoAluno) {
    if (!updateCursoAlunoDto.novoCurso) {
      throw new NotFoundException(`Associação entre aluno e curso não encontrada e nenhum novo curso foi fornecido.`);
    }
    
    const curso = await this.cursoRepository.findOne({ where: { codigo: updateCursoAlunoDto.novoCurso } });
    if (!curso) {
      throw new NotFoundException(`Curso com código ${updateCursoAlunoDto.novoCurso} não encontrado.`);
    }

    cursoAluno = this.cursoAlunoRepository.create({
      codigo_aluno: { codigo: codigoAluno }, 
      codigo_curso: curso,
    });
  } else {
    if (updateCursoAlunoDto.novoCurso) {
      const curso = await this.cursoRepository.findOne({ where: { codigo: updateCursoAlunoDto.novoCurso } });
      if (!curso) {
        throw new NotFoundException(`Curso com código ${updateCursoAlunoDto.novoCurso} não encontrado.`);
      }
      cursoAluno.codigo_curso = curso; 
    }
  }

  return this.cursoAlunoRepository.save(cursoAluno);
}





  async remove(codigo: number): Promise<void> {
    const cursoAluno = await this.findOne(codigo);
    await this.cursoAlunoRepository.remove(cursoAluno);
  }

    async findTopCursos(): Promise<{ descricao: string; totalAlunos: number }[]> {
    const cursoAlunos = await this.cursoAlunoRepository.find({ relations: ['codigo_curso'] });

    const cursoCountMap: { [codigoCurso: number]: { descricao: string; totalAlunos: number } } = {};

    cursoAlunos.forEach(cursoAluno => {
      const curso = cursoAluno.codigo_curso; 
      if (curso) {
        const codigoCurso = curso.codigo;
        
        if (cursoCountMap[codigoCurso]) {
          cursoCountMap[codigoCurso].totalAlunos++;
        } else {
          cursoCountMap[codigoCurso] = { descricao: curso.descricao, totalAlunos: 1 };
        }
      }
    });

    const sortedCursos = Object.values(cursoCountMap).sort((a, b) => b.totalAlunos - a.totalAlunos);

    return sortedCursos;
  }

}
