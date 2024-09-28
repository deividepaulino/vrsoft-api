import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoAlunoDto {
  @ApiProperty({ description: 'Código do aluno', example: 1 })
  @IsInt()
  codigo_aluno: number;

  @ApiProperty({ description: 'Código do curso', example: 1 })
  @IsInt()
  codigo_curso: number;
}
