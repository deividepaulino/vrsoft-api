import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { CursoAluno } from '../curso_aluno/entities/curso_aluno.entity';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,

    @InjectRepository(CursoAluno) 
    private cursoAlunoRepository: Repository<CursoAluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.alunoRepository.create(createAlunoDto);
    return this.alunoRepository.save(aluno);
  }

async findAll(): Promise<any[]> {
  const alunos = await this.alunoRepository.find({
    relations: ['cursoAlunos', 'cursoAlunos.codigo_curso'], 
  });

  return alunos.map(aluno => ({
    codigo: aluno.codigo,
    nome: aluno.nome,
    curso: aluno.cursoAlunos.length > 0  ? aluno.cursoAlunos[0].codigo_curso.descricao : 'Não matriculado',
  }));
}




  async findOne(codigo: number): Promise<Aluno> {
    const aluno = await this.alunoRepository.findOne({ where: { codigo } });
    if (!aluno) {
      throw new NotFoundException(`Aluno com código ${codigo} não encontrado.`);
    }
    return aluno;
  }

  async update(codigo: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.findOne(codigo); 
    Object.assign(aluno, updateAlunoDto);
    return this.alunoRepository.save(aluno);
  }

  async remove(codigo: number): Promise<void> {
  const aluno = await this.findOne(codigo);

  const cursosMatriculados = await this.cursoAlunoRepository.count({
    where: { codigo_aluno: aluno }, 
  });

  if (cursosMatriculados > 0) {
    throw new BadRequestException(`Não é possível excluir o aluno com código ${codigo} porque está matriculado em um curso.`);
  }

  await this.alunoRepository.remove(aluno);
}

}
