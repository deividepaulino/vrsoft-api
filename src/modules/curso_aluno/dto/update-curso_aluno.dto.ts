import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCursoAlunoDto {
  @IsNotEmpty()
  novoCurso: number;  
}
