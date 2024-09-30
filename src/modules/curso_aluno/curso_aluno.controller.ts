import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CursoAlunoService } from './curso_aluno.service';
import { CreateCursoAlunoDto } from './dto/create-curso_aluno.dto';
import { CursoAluno } from './entities/curso_aluno.entity';
import { UpdateCursoAlunoDto } from './dto/update-curso_aluno.dto';

@ApiTags('Curso-Alunos') 
@Controller('curso-alunos')
export class CursoAlunoController {
  constructor(private readonly cursoAlunoService: CursoAlunoService) {}

  @ApiOperation({ summary: 'Listar os cursos mais populares' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de cursos com maior número de alunos', type: Array })
  @Get('top-cursos')
  findTopCursos(): Promise<{ descricao: string; totalAlunos: number }[]> {
    return this.cursoAlunoService.findTopCursos();
  }

  @ApiOperation({ summary: 'Criar uma nova associação entre Aluno e Curso' })
  @ApiResponse({ status: 201, description: 'Associação criada com sucesso.', type: CursoAluno })
  @ApiResponse({ status: 404, description: 'Aluno ou Curso não encontrado.' })
  @ApiBody({ type: CreateCursoAlunoDto, description: 'Dados para associar um aluno a um curso' })
  @Post()
  create(@Body() createCursoAlunoDto: CreateCursoAlunoDto): Promise<CursoAluno> {
    return this.cursoAlunoService.create(createCursoAlunoDto);
  }

  @ApiOperation({ summary: 'Listar todas as associações entre Alunos e Cursos' })
  @ApiResponse({ status: 200, description: 'Lista todas as associações.', type: Array })
  @Get()
  findAll(): Promise<CursoAluno[]> {
    return this.cursoAlunoService.findAll();
  }

  @ApiOperation({ summary: 'Obter uma associação específica por código' })
  @ApiParam({ name: 'codigo', description: 'Código da associação Aluno-Curso' })
  @ApiResponse({ status: 200, description: 'Associação encontrada.', type: CursoAluno })
  @ApiResponse({ status: 404, description: 'Associação não encontrada.' })
  @Get(':codigo')
  findOne(@Param('codigo', ParseIntPipe) codigo: number): Promise<CursoAluno> {
    return this.cursoAlunoService.findOne(codigo);
  }

@ApiOperation({ summary: 'Atualizar o curso de um aluno específico' })
@ApiParam({ name: 'codigoAluno', description: 'ID do aluno para atualizar a associação' })
@ApiBody({
  type: UpdateCursoAlunoDto,
  description: 'Dados para atualizar a associação Aluno-Curso com um novo curso',
  examples: {
    'application/json': {
      value: {
        novoCurso: 1,  
      },
    },
  },
})
@ApiResponse({
  status: 200,
  description: 'Curso do aluno atualizado com sucesso.',
  type: CursoAluno,
  schema: {
    example: {
      codigo: 1,       
      codigo_curso: 1, 
      codigo_aluno: 2, 
    },
  },
})
@ApiResponse({ status: 404, description: 'Associação não encontrada ou curso não encontrado.' })
@Patch(':codigoAluno')
update(
  @Param('codigoAluno', ParseIntPipe) codigoAluno: number,
  @Body() updateCursoAlunoDto: UpdateCursoAlunoDto
): Promise<CursoAluno> {
  return this.cursoAlunoService.update(codigoAluno, updateCursoAlunoDto);
}



  @ApiOperation({ summary: 'Remover uma associação Aluno-Curso' })
  @ApiParam({ name: 'codigo', description: 'Código da associação a ser removida' })
  @ApiResponse({ status: 200, description: 'Associação removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Associação não encontrada.' })
  @Delete(':codigo')
  remove(@Param('codigo', ParseIntPipe) codigo: number): Promise<void> {
    return this.cursoAlunoService.remove(codigo);
  }
}
