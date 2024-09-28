import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
  ) {}

  create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.alunoRepository.create(createAlunoDto);
    return this.alunoRepository.save(aluno);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunoRepository.find();
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
    await this.alunoRepository.remove(aluno);
  }
}
