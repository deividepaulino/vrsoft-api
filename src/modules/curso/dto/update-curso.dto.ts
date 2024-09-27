import { IsInt, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCursoDto {
  @ApiProperty({ description: 'Código do curso', example: 1, required: false })
  @IsOptional()
  @IsInt()
  codigo?: number;

  @ApiProperty({ description: 'Descrição do curso', example: 'Curso de NestJS', maxLength: 50, required: false })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  descricao?: string; 

  @ApiProperty({ description: 'Ementa do curso', example: 'Ementa do curso de NestJS', required: false })
  @IsOptional()
  @IsString()
  ementa?: string; 
}
