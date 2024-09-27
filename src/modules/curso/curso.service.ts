import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) {}

  create(createCursoDto: CreateCursoDto): Promise<Curso> {
    const curso = this.cursoRepository.create(createCursoDto);
    return this.cursoRepository.save(curso);
  }

  findAll(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async findOne(codigo: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({ where: { codigo } });
    if (!curso) {
      throw new NotFoundException(`Curso com código ${codigo} não encontrado.`);
    }
    return curso;
  }

  async update(codigo: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(codigo);
    Object.assign(curso, updateCursoDto); 
    return this.cursoRepository.save(curso);
  }

 
  async remove(codigo: number): Promise<void> {
    const curso = await this.findOne(codigo);
    await this.cursoRepository.remove(curso);
  }
}
