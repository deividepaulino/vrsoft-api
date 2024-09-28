import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { Aluno } from './entities/aluno.entity';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@ApiTags('alunos')
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo aluno' })
  create(@Body() createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os alunos' })
  findAll(): Promise<Aluno[]> {
    return this.alunoService.findAll();
  }

  @Get(':codigo')
  @ApiOperation({ summary: 'Buscar um aluno pelo código' })
  findOne(@Param('codigo') codigo: number): Promise<Aluno> {
    return this.alunoService.findOne(codigo);
  }

  @Patch(':codigo')
  @ApiOperation({ summary: 'Atualizar um aluno pelo código' })
  update(@Param('codigo') codigo: number, @Body() updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    return this.alunoService.update(codigo, updateAlunoDto);
  }

  @Delete(':codigo')
  @ApiOperation({ summary: 'Remover um aluno pelo código' })
  remove(@Param('codigo') codigo: number): Promise<void> {
    return this.alunoService.remove(codigo);
  }
}
