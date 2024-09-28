import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({ description: 'Nome do aluno', example: 'João Silva', maxLength: 50 })
  @IsString()
  @Length(1, 50)
  nome: string;
}
