import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CursoAlunoService } from './curso_aluno.service';
import { CreateCursoAlunoDto } from './dto/create-curso_aluno.dto';
import { CursoAluno } from './entities/curso_aluno.entity';
import { UpdateCursoAlunoDto } from './dto/update-curso_aluno.dto';

@ApiTags('curso_alunos')
@Controller('curso-alunos')
export class CursoAlunoController {
  constructor(private readonly cursoAlunoService: CursoAlunoService) {}

  @Post()
  create(@Body() createCursoAlunoDto: CreateCursoAlunoDto): Promise<CursoAluno> {
    return this.cursoAlunoService.create(createCursoAlunoDto);
  }

  @Get()
  findAll(): Promise<CursoAluno[]> {
    return this.cursoAlunoService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: number): Promise<CursoAluno> {
    return this.cursoAlunoService.findOne(codigo);
  }

  @Patch(':codigo')
  update(@Param('codigo') codigo: number, @Body() updateCursoAlunoDto: UpdateCursoAlunoDto): Promise<CursoAluno> {
    return this.cursoAlunoService.update(codigo, updateCursoAlunoDto);
  }

  @Delete(':codigo')
  remove(@Param('codigo') codigo: number): Promise<void> {
    return this.cursoAlunoService.remove(codigo);
  }
}
