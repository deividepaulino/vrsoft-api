import { PartialType } from '@nestjs/mapped-types';
import { CreateCursoAlunoDto } from  './create-curso_aluno.dto';

export class UpdateCursoAlunoDto extends PartialType(CreateCursoAlunoDto) {}
