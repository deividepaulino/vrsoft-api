import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  @ApiProperty({ description: 'Nome do aluno', example: 'Maria Silva', maxLength: 50, required: false })
  nome?: string; 
}
