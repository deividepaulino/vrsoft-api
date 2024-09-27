import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CursoService } from './curso.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateCursoDto } from './dto/create-curso.dto';
import { Curso } from './entities/curso.entity';
import { UpdateCursoDto } from './dto/update-curso.dto';

@ApiTags('curso')
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Curso criado.' })
  create(@Body() createCursoDto: CreateCursoDto): Promise<Curso> {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de cursos.' })
  findAll(): Promise<Curso[]> {
    return this.cursoService.findAll();
  }

  @Get(':codigo')
  @ApiResponse({ status: 200, description: 'Curso encontrado.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  findOne(@Param('codigo') codigo: number): Promise<Curso> {
    return this.cursoService.findOne(codigo);
  }

  @Put(':codigo')
  @ApiResponse({ status: 200, description: 'Curso atualizado.' })
  update(@Param('codigo') codigo: number, @Body() updateCursoDto: UpdateCursoDto): Promise<Curso> {
    return this.cursoService.update(codigo, updateCursoDto );
  }

  @Delete(':codigo')
  @ApiResponse({ status: 204, description: 'Curso removido.' })
  remove(@Param('codigo') codigo: number): Promise<void> {
    return this.cursoService.remove(codigo);
  }
}
