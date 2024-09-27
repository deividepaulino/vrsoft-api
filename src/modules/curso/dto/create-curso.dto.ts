import { IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCursoDto {
  @ApiProperty({ description: 'Código do curso', example: 1 })
  @IsInt()
  codigo: number;

  @ApiProperty({ description: 'Descrição do curso', example: 'Curso de NestJS', maxLength: 50 })
  @IsString()
  @Length(1, 50)
  descricao: string;

  @ApiProperty({ description: 'Ementa do curso', example: 'Ementa do curso de NestJS' })
  @IsString()
  ementa: string;
}
